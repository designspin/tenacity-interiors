import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export const HomeQuery = graphql`
    query Home($id: String!) {
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
        }
        kitchens: markdownRemark(fields: { slug: { eq: "/handmade-kitchens/"}}) {
            frontmatter {
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        bedrooms: markdownRemark(fields: {slug: { eq: "/fitted-bedrooms/"}}) {
            frontmatter {
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        vanity: markdownRemark(fields: {slug: { eq: "/vanity-units/"}}) {
            frontmatter {
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        furniture: markdownRemark(fields: {slug: { eq: "/bespoke-furniture/"}}) {
            frontmatter {
                mainImage {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;