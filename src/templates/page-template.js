import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerLanding';

export const PageQuery = graphql`
    query Page($id: String!) {
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
            }
        }
    }
`;

export const PageTemplate = ({mainHeading, mainText, title, content, contentComponent}) => {
    const PostContent = contentComponent || Content;

    return (
    <main>
        <Banner
            title={mainHeading}
            introText={mainText}
        />
        <section className="paper">
            <div className="inner">
                <h2>{title}</h2>
                <PostContent className="columns-2" content={content} />
            </div>
        </section>
    </main>
    )
}

const Page = ({data}) => {
    const { markdownRemark: post } = data;
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
            />
        </Layout>
    )
}

export default Page;