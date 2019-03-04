import React from 'react';
import Img from 'gatsby-image';

const TestimonialBlock = ({ testimonials }) => (
  <div className="grid-wrapper">
    {testimonials.edges.map((testimonial) => (
      <div className="col-4 mb-5">
        <div className="testimonial testimonial--block">
          <h4 className="testimonial__title">{testimonial.node.frontmatter.title}</h4>
          <blockquote>{testimonial.node.frontmatter.quote}</blockquote>
          <div className="testimonial__cite">
            <Img style={{width: "46px"}} sizes={testimonial.node.frontmatter.image.childImageSharp.fluid} />
            <div><strong>{testimonial.node.frontmatter.name}</strong> {testimonial.node.frontmatter.location && <em>, {testimonial.node.frontmatter.location}</em>}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TestimonialBlock;