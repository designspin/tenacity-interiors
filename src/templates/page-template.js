import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/BannerLanding';
import pic05 from '../assets/images/karl-andrews.png'

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
    <main id="main">
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
        <aside>
            <div className="inner">
                <div className="grid-wrapper">
                    <div className="col-8">
                        <p>Tenacity Interiors has an outstanding reputation for excellence, with installations in the heart of London and New York’s most fashionable districts. Owners Karl Andrews &amp; Trevor Pragg also take pride in being a local company creating beautiful rooms for homes across East Anglia.</p>
                        <p>As a private client or interior design professional, you will be able to rely on the skills, dedication and care that every project always receives. Tenacity Interiors experts can offer original designs or replicate existing furniture for you, for any room, whatever style you have in mind.</p>
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