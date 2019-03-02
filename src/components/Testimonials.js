import React from 'react';
import ReactSlick from 'react-slick';
import { graphql, StaticQuery } from 'gatsby';

const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
}

const TestimonialsQuery = graphql`
    query TestimonialsQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title]}
          filter: {fileAbsolutePath: {regex: "/client-testimonials/"}}
        ) {
          edges {
            node {
              id
              frontmatter {
                quote
                title
                location
              }
            }
          }
        }
      }
`;

const Testimonials = ({ posts }) => (
    <ReactSlick {...settings}>
        {posts.map((post) => 
            <figure key={post.node.id} className="testimonial">
                <blockquote>{post.node.frontmatter.quote}</blockquote>
                <footer>
                    <cite>- <strong>{post.node.frontmatter.title}</strong>, <em>{post.node.frontmatter.location}</em></cite>
                </footer>
            </figure>
        )}
    </ReactSlick>
);

const TestimonialComponent = (props) =>
    <StaticQuery
        query={TestimonialsQuery}
        render={ result => {
            const data = result.allMarkdownRemark.edges;
            return <Testimonials posts={data} {...props} />
        }} />

export default TestimonialComponent;