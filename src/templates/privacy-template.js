import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerLanding';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'

export const PrivacyQuery = graphql`
    query Privacy($id: String!) {
        post: markdownRemark(id: { eq: $id }) {
            id
            frontmatter {
                templateKey
                metaTitle
                metaDescription
                title
                about
                sections {
                  title
                  body
                }
            }
            fields {
                slug
            }
        }
    }
`;

export const PrivacyTemplate = ({title, about, sections}) => {
  return (
    <main id="main" className="privacy-template">
      <div className="paper">
            <div className="inner">
              <header className="major">
                <h1>{title}</h1>
              </header>
              <HTMLContent content={about} />
              <ul className="box">
              { sections.map((part) => 
                <li key={`list-${part.title}`}><a href={`#${part.title.replace(/\s/g, '')}`}>{part.title}</a></li>
              )}
              </ul>
              <div className="columns-2">
              { sections.map((part, i) => 
                <section key={`section-${part.title}`}>
                  <h2 id={part.title.replace(/\s/g, '')}>{i+1}. {part.title}</h2>
                  <HTMLContent content={part.body.replace('<p><div>', '<div>').replace('</div></p>', '</div>')} />
                </section>
              )}
              </div>
            </div>
      </div>
    </main>
  );
}

const PrivacyPage = ({ data }) => {
  const { post } = data;

  return (
    <Layout
      templateKey={post.frontmatter.templateKey}
      metaTitle={post.frontmatter.metaTitle}
      metaDescription={post.frontmatter.metaDescription}
    >
      <PrivacyTemplate
        title={post.frontmatter.title}
        about={post.frontmatter.about.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
        sections={post.frontmatter.sections}
      />
    </Layout>
  );
}

export default PrivacyPage;