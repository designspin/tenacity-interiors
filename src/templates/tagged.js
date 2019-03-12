import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Pagination from '../components/Pagination';
import Post from '../components/Post';
import Observer from 'react-intersection-observer';
import { NavConsumer } from '../components/layout';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';

export const TagQuery = graphql`
  query TagPage($nodes: [String]) {
    posts: allMarkdownRemark(
      filter: { fields: { ids: { in: $nodes } } },
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
            date(formatString: "DD MMMM, YYYY")
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

const TagTemplateDetails = (props) => {
  
  const { tag, page, prev, next, pages, total } = props.pageContext;
  const items = [];
  const posts = props.data.posts.edges;
  
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
                      <h1>{ total } post{ total === 1 ? '' : 's'} tagged as &quot;{tag}&quot;</h1>                   
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

const TagsTemplateDetails = (props) => {
  const { category, nodes, page, pages, prev, next, total } = props.pageContext;

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
                      <h1>Tags in {category}</h1>                   
                  </div>
                </header>
            </Observer>
        )}
    </NavConsumer>
    <section className="paper">
          <div className="inner">
            { nodes.map((tagName) => {
              return (
                <h2><Link to={`${category}/tags/${kebabCase(tagName)}`}>{tagName}</Link></h2>
              );
            })}
          </div>
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

const TagTemplate = (props) => {
  console.log(props);
  const { tag, category } = props.pageContext;
  const { meta } = props.data;

  if(tag) {
    return (
      <Layout
        metaTitle={`All posts tagged as "${tag}"`}
        metaDescription={`Read Tenacity Interiors posts tagged as "${tag}"`}
        metaPageUrl={meta.siteMetadata.siteUrl + props.location.pathname }
        siteUrl={meta.siteMetadata.siteUrl} >
        <TagTemplateDetails {...props} />
      </Layout>
    )
  } else {
    return (
      <Layout
        metaTitle={`Tags in ${category}`}
        metaDescription={`View Tenacity Interiors blog posts by Tags`}
        metaPageUrl={meta.siteMetadata.siteUrl + props.location.pathname }
        siteUrl={meta.siteMetadata.siteUrl} >
        <TagsTemplateDetails {...props} />
      </Layout>
    )
  }
};

export default TagTemplate;