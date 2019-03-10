import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerBlog';

export const BlogPageQuery = graphql`
  query BlogPageQuery($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        templateKey
        title
        date(formatString: "DD MMMM, YYYY")
        tags
        description
        mainImage {
          childImageSharp {
              fluid(maxWidth: 1900) {
                  ...GatsbyImageSharpFluid
              }
              fixed(width: 1200, height: 630) {
                ...GatsbyImageSharpFixed
              }
          }
        }
      }
      fields {
        slug
      }
    }
    meta: site {
      siteMetadata {
          siteUrl
      }
    }
  }
`;

const BlogPostTemplate = ({ title, date, content, contentComponent, url, mainImage }) => {
  const PostContent = contentComponent || Content;

  return (
    <article id="main" className="alt">
        <Banner
          title={title}
          date={date}
          mainImage={mainImage} />
          <div className="paper">
            <div className="inner">
              <PostContent content={content} />
            </div>
          </div>
    </article>
  )
};

const BlogPost = ({ data }) => {
  const { post } = data;
  const { meta } = data;
  return (
      <Layout
          templateKey={post.frontmatter.templateKey}
          metaTitle={post.frontmatter.title}
          metaDescription={post.frontmatter.description}
          metaImage={post.frontmatter.mainImage.childImageSharp.fixed.src}
          metaPageUrl={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
          siteUrl={meta.siteMetadata.siteUrl}
          >
          <BlogPostTemplate
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              mainImage={post.frontmatter.mainImage.childImageSharp.fluid}
              content={post.html.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
              contentComponent={HTMLContent}
              url={post.fields.slug}
          />
      </Layout>
  );
};

export default BlogPost;