import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

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

export const Post = (props) => {
  const { node: post } = props.data;
  console.log(post);
  return (
    <section>
      <Link to={post.fields.slug} className="image">
        <Img 
          alt={post.frontmatter.title}
          sizes={post.frontmatter.mainImage.childImageSharp.fluid} 
          style={{
            maxHeight: "450px",
            width: "100%",
            height: "100%"
        }} />
      </Link>
      <div className="content">
        <div className="inner">
          <header className="major">
            <h3>{post.frontmatter.title}</h3>
            <datetime>{post.frontmatter.date}</datetime>
            <p>{post.frontmatter.description}</p>
            <ul className="actions">
              <li>
                <Link to={post.fields.slug} className="button">Read More</Link>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </section>
  )
};

const BlogCatTemplate = (props) => {
  const { category, page, prev, next, pages, total } = props.pageContext;
  const posts = props.posts;
  const items = [];

  posts.forEach((post) => {
    items.push(<Post data={post} key={post.node.id} />);
  });

  return (
    <main id="main">
      <header className="paper">
        <div className="inner">
          <div className="subheader">
            <small>{ total } post{ total === 1 ? '' : 's'} in</small>
          </div>
          <h1 style={{ textTransform: 'capitalize'}}>{ category }</h1>
        </div>
      </header>
      <section className="spotlights">
      { items }
      </section>
    </main>
  )
}

const BlogCat = (props) => {
  const { data } = props;
  const post = props.data.post.edges;
  const { meta } = data;

  const { category } = props.pageContext;
  const { pathname } = props.location;
  console.log(props);

  return (
      <Layout
          metaTitle={`${ category } | Tenacity Interiors`}
          metaDescription={`Read Tenacity Interiors' latest blog articles.`}
          metaPageUrl={meta.siteMetadata.siteUrl + pathname}
          siteUrl={meta.siteMetadata.siteUrl}
          >
          <BlogCatTemplate posts={post} {...props} />
          {/* <BlogPostTemplate
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              mainImage={post.frontmatter.mainImage.childImageSharp.fluid}
              content={post.html.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
              contentComponent={HTMLContent}
              url={post.fields.slug}
          />*/}
      </Layout>
  );
};

export default BlogCat;