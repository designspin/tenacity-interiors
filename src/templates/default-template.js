import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';

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
        }
    }
`;

const DefaultTemplate = ({ title, content, contentComponent }) => {
    const PostContent = contentComponent || Content;

    return (
        <section className="paper">
            <div className="inner">
                <header className="major">
                    <h1>{ title }</h1>
                </header>
                <PostContent content={content} />
            </div>
        </section>
    )
}

const DefaultPage = ({ data }) => {
    const { post } = data;

    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            >
            <DefaultTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
            />
        </Layout>
    );
};

export default DefaultPage;