import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/Pagination';
import Post from '../components/Post';
import Observer from 'react-intersection-observer';
import { NavConsumer } from '../components/layout';


export const CategoryQuery = graphql`
  query CategoryPage($nodes: [String]) {
    post: allMarkdownRemark(
      filter: { fields: {ids: { in: $nodes } } },
      sort: { order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
            categoryPath
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
            mainImage {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    meta: site {
      siteMetadata {
          siteUrl
      }
    }
  }
`;



const BlogCatTemplate = (props) => {
  const { category, page, prev, next, pages, total } = props.pageContext;
  const posts = props.posts;
  const items = [];

  posts.forEach((post) => {
    items.push(<Post data={post} key={post.node.id} />);
  });

  return (
    <main id="main">
      <NavConsumer>
        {({ trigger }) => (
            <Observer 
                tag="section"  
                className="paper"
                threshold={0}
                onChange={(inView) => { trigger(!inView)}}>
                <header className="inner">
                  <div className="inner">
                    <div className="subheader">
                      <small>{ total } post{ total === 1 ? '' : 's'} in</small>
                    </div>
                    <h1 style={{ textTransform: 'capitalize'}}>{ category }</h1>
                  </div>
                </header>
            </Observer>
        )}
    </NavConsumer>
      <section className="spotlights">
      { items }
      </section>
      
        <div className="inner">
          <Pagination
            page={page}
            pages={pages}
            prev={prev}
            next={next}
            total={total}
            prevText="Prev"
            nextText="Next" 
          />
        </div>
        
    </main>
  )
}

const BlogCat = (props) => {
  const { data } = props;
  const post = props.data.post.edges;
  const { meta } = data;

  const { category } = props.pageContext;
  const { pathname } = props.location;

  return (
      <Layout
          metaTitle={`${ category } | Tenacity Interiors`}
          metaDescription={`Read Tenacity Interiors' latest blog articles.`}
          metaPageUrl={meta.siteMetadata.siteUrl + pathname}
          siteUrl={meta.siteMetadata.siteUrl}
          >
          <BlogCatTemplate posts={post} {...props} />
      </Layout>
  );
};

export default BlogCat;