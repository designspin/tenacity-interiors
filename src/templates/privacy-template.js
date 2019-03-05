import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { HTMLContent } from '../components/Content';
import Banner from '../components/BannerDefault';
//import Share from '../components/Share';
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
        meta: site{
          siteMetadata {
              siteUrl
          }
      }
    }
`;

export const PrivacyTemplate = ({title, about, sections, settings}) => {
  return (
    <main id="main" className="privacy-template">
      <div className="paper">
            <div className="inner">
              <Banner title={title} />
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
      <aside>
            <div className="inner">
                <div className="grid-wrapper">
                    
                    <div className="col-12 complimentary">
                    <p className="col-8">To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone.replace(' ', '')}`}>{settings.phone}<strong></strong></a></p>
                        <img className="col-4" src={pic05} alt="Karl Andrews" />
                    </div>
                </div>
            </div>
        </aside>
    </main>
  );
}

const PrivacyPage = ({ data }) => {
  const { post } = data;
  const { meta } = data;
  return (
    <Layout
      templateKey={post.frontmatter.templateKey}
      metaTitle={post.frontmatter.metaTitle}
      metaDescription={post.frontmatter.metaDescription}
      metaPageUrl={meta.siteMetadata.siteUrl + post.fields.slug}
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