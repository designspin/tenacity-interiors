import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerLanding';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'
import Lightbox from '../components/Lightbox';

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
    }
`;

export const PageTemplate = ({mainHeading, mainText, title, content, contentComponent, url, mainImage, settings, projects}) => {
    const PostContent = contentComponent || Content;
    console.log(projects);
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
        <aside>
            <div className="inner">
                <div className="grid-wrapper">
                    <div className="col-8">
                        <Share url={url} text="Share This:" />
                    </div>
                    <div className="col-4 complimentary">
                    <p className="col-8">To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone}`}>{settings.phone}<strong></strong></a></p>
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
    
    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            >
            <PageTemplate 
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                mainHeading={post.frontmatter.mainHeading}
                mainText={post.frontmatter.mainText}
                url={post.fields.slug}
                mainImage={post.frontmatter.mainImage.childImageSharp.fluid}
                projects={edges}
            />
        </Layout>
    )
}

export default Page;