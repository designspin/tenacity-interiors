import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

const Post = (props) => {
  const { node: post } = props.data;
  console.log(post);
  return (
    <section>
      <Link to={post.fields.slug} className="image">
        <Img 
          alt={post.frontmatter.title}
          sizes={post.frontmatter.mainImage.childImageSharp.fluid} 
          style={{
            maxHeight: "450px",
            width: "100%",
            height: "100%"
        }} />
      </Link>
      <div className="content">
        <div className="inner">
          <header className="major">
            <h3>{post.frontmatter.title}</h3>
            <datetime>{post.frontmatter.date}</datetime>
            <p>{post.frontmatter.description}</p>
            <ul className="actions">
              <li>
                <Link to={post.fields.slug} className="button">Read More</Link>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </section>
  )
};

export default Post;