import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerDefault';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'
import TestimonialBlock from '../components/TestimonialBlock';

export const DefaultQuery = graphql`
    query DefaultPage($id: String!) {
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
        testimonials: allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title]}
            filter: {
                fileAbsolutePath: {regex: "/client-testimonials/"}
                frontmatter: {type: {eq: "interior-designer"}}
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        category
                        type
                        name
                        location
                        quote
                        image {
                            childImageSharp{
                                fluid(maxWidth: 46) {
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

const DefaultTemplate = ({ title, content, contentComponent, url, settings, testimonials }) => {
    const PostContent = contentComponent || Content;

    return (
    <main id="main">
        <section className="paper">
            <div className="inner">
                <Banner title={title} />
                <PostContent content={content} />
            </div>
        </section>
        { url === "/interior-designers-architects/" &&
         <section className="paper paper--testimonials">
            <div className="inner">
                <TestimonialBlock testimonials={testimonials} />
            </div>
         </section>
        }
        <aside>
            <div className="inner">
                <div className="row">
                    <div className="col-md-8">
                        <Share url={url} text="Share This:" />
                    </div>
                    <div className="col-md-4 complimentary">
                    <p className="col-md-8">To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone.replace(' ', '')}`}>{settings.phone}<strong></strong></a></p>
                        <img className="col-md-4" src={pic05} alt="Karl Andrews" />
                    </div>
                </div>
            </div>
        </aside>
    </main>
    )
}

const DefaultPage = ({ data }) => {
    const { post } = data;
    const { testimonials } = data;
    const { meta } = data;
    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            metaPageUrl={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
            siteUrl={meta.siteMetadata.siteUrl}
            >
            <DefaultTemplate
                title={post.frontmatter.title}
                content={post.html.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
                contentComponent={HTMLContent}
                url={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
                testimonials={testimonials}
            />
        </Layout>
    );
};

export default DefaultPage;