import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';

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
                title
            }
        }
    }
`;

export const PageTemplate = () => {
    return (
        <p>Page Template: no data</p>
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
            <PageTemplate />
        </Layout>
    )
}

export default Page;