import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Contact from '../components/Contact';
import Banner from '../components/BannerDefault';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'

export const ContactQuery = graphql`
    query ContactPage($id: String!) {
        post: markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                templateKey
                metaTitle
                metaDescription
                title
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

const ContactTemplate = ({ title, content, contentComponent, url, settings }) => {
    const PostContent = contentComponent || Content;

    return (
    <main id="main">
        <section className="paper">
            <div className="inner">
                <Banner title={title} />
                <PostContent content={content} />
            </div>
        </section>
        <Contact settings={settings} />
        <aside>
            <div className="inner">
                <div className="row">
                    <div className="col-md-8">
                        <Share url={url} text="Share This:" />
                    </div>
                    <div className="col-md-4 complimentary">
                        <p className="col-md-8">To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone}`}>{settings.phone}<strong></strong></a></p>
                        <img className="col-md-4" src={pic05} alt="Karl Andrews" />
                    </div>
                </div>
            </div>
        </aside>
    </main>
    )
}

const ContactPage = ({ data }) => {
    const { post } = data;
    const { meta } = data;
    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            metaPageUrl={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
            siteUrl={meta.siteMetadata.siteUrl}
            >
            <ContactTemplate
                title={post.frontmatter.title}
                content={post.html.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
                contentComponent={HTMLContent}
                url={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
            />
        </Layout>
    );
};

export default ContactPage;