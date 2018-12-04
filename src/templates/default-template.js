import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerDefault';
import Share from '../components/Share';
import pic05 from '../assets/images/karl-andrews.png'

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
    }
`;

const DefaultTemplate = ({ title, content, contentComponent, url }) => {
    const PostContent = contentComponent || Content;

    return (
    <main id="main">
        <section className="paper">
            <div className="inner">
                <Banner title={title} />
                <PostContent content={content} />
            </div>
        </section>
        <aside>
            <div className="inner">
                <div className="grid-wrapper">
                    <div className="col-8">
                        <Share url={url} text="Share This:" />
                    </div>
                    <div className="col-4 complimentary">
                        <p className="col-8">To book your complimentary design consultation today call Karl on <a href="tel:01485 521888"><strong>01485 521888</strong></a></p>
                        <img className="col-4" src={pic05} alt="Karl Andrews" />
                    </div>
                </div>
            </div>
        </aside>
    </main>
    )
}

const DefaultPage = ({ data }) => {
    const { post } = data;
    console.log(post.html);
    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            >
            <DefaultTemplate
                title={post.frontmatter.title}
                content={post.html.replace('<p><div>', '<div>').replace('</div></p>', '</div>')}
                contentComponent={HTMLContent}
                url={post.fields.slug}
            />
        </Layout>
    );
};

export default DefaultPage;