import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerLanding';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'
import Lightbox from '../components/Lightbox';
import TestimonialBlock from '../components/TestimonialBlock';

export const PageQuery = graphql`
    query Page($id: String!, $cat: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                templateKey
                metaTitle
                metaDescription
                mainHeading
                mainText
                title
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
        images: allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title]}
            filter: {
                fileAbsolutePath: {regex: "/projects/"}
                frontmatter: {category: { eq: $cat}}
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        category
                        image {
                            childImageSharp {
                                fluid(maxWidth: 900) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
        testimonials: allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___title]}
            filter: {
                fileAbsolutePath: {regex: "/client-testimonials/"}
                frontmatter: {category: {eq: $cat}}
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        category
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
        meta: site{
            siteMetadata {
                siteUrl
            }
        }
    }
`;

export const PageTemplate = ({mainHeading, mainText, title, content, contentComponent, url, siteUrl, mainImage, settings, projects, testimonials}) => {
    const PostContent = contentComponent || Content;
    
    return (
    <main id="main">
        <Banner
            title={mainHeading}
            introText={mainText}
            mainImage={mainImage}
        />
        <section className="paper">
            <div className="inner">
                { projects && projects.edges &&
                    <Lightbox images={projects.edges} />
                }
            </div>
        </section>
        <section className="paper">
            <div className="inner">
                <h2>{title}</h2>
                <PostContent className="columns-2" content={content} />
            </div>
        </section>
        { testimonials &&
            <section className="paper paper--testimonials">
                <div className="inner">
                    <TestimonialBlock testimonials={testimonials} />
                </div>
            </section>
        }
        <aside>
            <div className="inner">
                <div className="grid-wrapper">
                    <div className="col-8">
                        <Share url={siteUrl + url} text="Share This:" />
                    </div>
                    <div className="col-4 complimentary">
                    <p className="col-8">To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone.replace(' ', '')}`}>{settings.phone}<strong></strong></a></p>
                        <img className="col-4" src={pic05} alt="Karl Andrews" />
                    </div>
                </div>
            </div>
        </aside>
    </main>
    )
}

const Page = ({data}) => {
    const { markdownRemark: post } = data;
    const { images: edges } = data;
    const { testimonials } = data;
    const { meta } = data;

    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            metaImage={post.frontmatter.mainImage.childImageSharp.fixed.src}
            >
            <PageTemplate 
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                mainHeading={post.frontmatter.mainHeading}
                mainText={post.frontmatter.mainText}
                url={post.fields.slug}
                siteUrl={meta.siteMetadata.siteUrl}
                mainImage={post.frontmatter.mainImage.childImageSharp.fluid}
                projects={edges}
                testimonials={testimonials}
            />
        </Layout>
    )
}

export default Page;