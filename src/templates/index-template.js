import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/Content';
import Banner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Post from '../components/Post';
import InteriorTestimonials from '../components/InteriorTestimonials';
import pic05 from '../assets/images/karl-andrews.png'


export const IndexQuery = graphql`
    query IndexPage($id: String!) {
        post: markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                templateKey
                metaTitle
                metaDescription
                mainVideo
                mainHeading
                mainText
                title
            }
            fields {
                slug
            }
        }
        kitchens: markdownRemark(fields: { slug: { eq: "/handmade-kitchens/"}}) {
            frontmatter {
                mainHeading
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        bedrooms: markdownRemark(fields: {slug: { eq: "/fitted-bedrooms/"}}) {
            frontmatter {
                mainHeading
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        vanity: markdownRemark(fields: {slug: { eq: "/vanity-units/"}}) {
            frontmatter {
                mainHeading
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        furniture: markdownRemark(fields: {slug: { eq: "/bespoke-furniture/"}}) {
            frontmatter {
                mainHeading
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        interior: markdownRemark(fields: {slug: {eq: "/interior-designers-architects/"}}) {
            excerpt
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        meta: site {
            siteMetadata {
                siteUrl
            }
        }
        latest: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/blog/"}
            }
            sort: { order: DESC, fields: [frontmatter___date]}
            limit: 1
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 250)
                fields {
                  slug
                  categoryPath
                }
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  tags
                  description
                  mainImage {
                    childImageSharp {
                      fluid(maxWidth: 600) {
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

const PageTemplate = ({ title, content, contentComponent, videoId, mainHeading, mainText, kitchen, bedroom, vanity, furniture, settings, interior, latest }) => {
    const PostContent = contentComponent || Content;
    const blogItems = [];

    latest.edges.forEach((post) => {
        blogItems.push(<Post data={post} key={post.node.id} />);
    });

    return (
        <main id="main">
            <Banner
                title={mainHeading}
                introText={mainText}
                videoId={videoId}
            />
            <section className="paper">
                <div className="inner">
                    <div className="grid-wrapper">
                        <div className="col-4 box alt">
                            <h2>Why Choose Us?</h2>
                            <ul className="alt">
                                <li><i className="fa fa-fw fa-check-square"></i>Each project is hand-crafted from the outset</li>
                                <li><i className="fa fa-fw fa-check-square"></i>The best available materials from established and exotic sources</li>
                                <li><i className="fa fa-fw fa-check-square"></i>Every detail of your project will be perfect, whatever style you choose</li>
                            </ul>
                        </div>
                        <div className="col-8 col-min-fix">
                            <h2>Kind Customer Words</h2>
                            <Testimonials />
                        </div>
                    </div>
                </div>
            </section>
            <section className="paper paper--alt">
                <div className="inner">
                    <header className="major">
                        <h2>A Reputation For Excellence</h2>
                    </header>
                    <PostContent content={content}/>
                </div>
            </section>
            <section className="tiles">
                <article>
                    <Img 
                        alt={kitchen.alt}
                        sizes={kitchen.image}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%"
                        }} />
                    <header className="major">
                        <h3>Kitchens</h3>
                        <p>Hand-Crafted, as Individual as You</p>
                    </header>
                    <Link aria-label="Kitchens" to="/handmade-kitchens" className="link primary"></Link>
                </article>
                <article>
                    <Img 
                        alt={bedroom.alt}
                        sizes={bedroom.image}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%"
                        }} />
                    <header className="major">
                        <h3>Bedrooms</h3>
                        <p>Hand-Made Fitted Bedrooms</p>
                    </header>
                    <Link aria-label="Bedrooms" to="/fitted-bedrooms" className="link primary"></Link>
                </article>
                <article>
                    <Img 
                        alt={vanity.alt}
                        sizes={vanity.image}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%"
                        }} />
                    <header className="major">
                        <h3>Vanity Units</h3>
                        <p>Hand-Made Specifically For You</p>
                    </header>
                    <Link aria-label="Vanity Units" to="/vanity-units" className="link primary"></Link>
                </article>
                <article>
                    <Img 
                        alt={furniture.alt}
                        sizes={furniture.image}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%"
                        }} />
                    <header className="major">
                        <h3>Furniture</h3>
                        <p>We Design and Deliver Hand Made Furniture You Need</p>
                    </header>
                    <Link aria-label="Furniture" to="/bespoke-furniture" className="link primary"></Link>
                </article>
            </section>
            <section className="paper">
                <div className="inner">
                    <div className="grid-wrapper">
                        <div className="col-8 col-min-fix mb-5">
                            <h2>What Interior Designers Say...</h2>
                            <InteriorTestimonials />
                        </div>
                        <aside className="col-4 box alt">
                            <h2>{interior.frontmatter.title}</h2>
                            <p>{interior.excerpt}<Link to={interior.fields.slug}>Read More</Link></p>
                        </aside>
                    </div>
                </div>
            </section>
            <div className="grid-wrapper paper paper--alt">
                    <div className="col-8">
                        <section className="spotlights">
                            { blogItems }
                        </section>
                    </div>
                    <div style={{ overflow: 'hidden'}} className="col-4 complimentary">
                        <p style={{ marginLeft: '1em'}}>To book your complimentary design consultation today call Karl on <a href={`tel:${settings.phone}`}>{settings.phone}<strong></strong></a></p>
                        <img style={{minWidth: '150px', marginRight: '1em'}} src={pic05} alt="Karl Andrews" />
                    </div>
            </div>
            
        </main>
    )
}

const IndexPage = ({ data }) => {
    const { post, kitchens, bedrooms, vanity, furniture, interior, meta, latest } = data;

    return (
        <Layout
            templateKey={post.frontmatter.templateKey}
            metaTitle={post.frontmatter.metaTitle}
            metaDescription={post.frontmatter.metaDescription}
            metaPageUrl={meta.siteMetadata.siteUrl + post.fields.slug.replace(/\/(?=[^\/]*$)/, '')}
            siteUrl={meta.siteMetadata.siteUrl}
            >
            <PageTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                interior={interior}
                videoId={post.frontmatter.mainVideo}
                mainHeading={post.frontmatter.mainHeading}
                mainText={post.frontmatter.mainText}
                kitchen={{ image: kitchens.frontmatter.mainImage.childImageSharp.fluid, alt: kitchens.frontmatter.mainHeading}}
                bedroom={{ image: bedrooms.frontmatter.mainImage.childImageSharp.fluid, alt: bedrooms.frontmatter.mainTitle }}
                vanity={{ image: vanity.frontmatter.mainImage.childImageSharp.fluid, alt: vanity.frontmatter.mainTitle }}
                furniture={{ image: furniture.frontmatter.mainImage.childImageSharp.fluid, alt: furniture.frontmatter.mainTitle }}
                latest={latest}
            />
        </Layout>
    );
};

export default IndexPage;

