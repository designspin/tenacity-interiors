import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

class Lightbox extends Component {
  state = {
    showLightbox: false,
    selectedImage: 0
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ showLightbox: !this.state.showLightBox, selectedImage: index });
  }

  closeModal = () => {
    this.setState({ showLightbox: false });
  }

  goBack = () => {
    this.setState({ selectedImage: this.state.selectedImage - 1 });
  }

  goForward = () => {
    this.setState({ selectedImage: this.state.selectedImage + 1 });
  }

  handleKeyUp = e => {
    e.preventDefault();
    const { keyCode } = e;
    if(this.state.showLightbox) {
      if(keyCode === 37) {
        //Left arrow key
        if (this.state.selectedImage > 0) {
          this.setState({ selectedImage: this.state.selectedImage - 1 });
        }
      }
      if( keyCode === 39) {
        //Right arrow key
        if(this.state.selectedImage < this.props.images.length - 1) {
          this.setState({ selectedImage: this.state.selectedImage + 1});
        }
      }
      if(keyCode === 27) {
        //Escape key
        this.setState({ showLightBox: false })
      }
    }
  }

  render() {
    const { images } = this.props;
    const { showLightbox, selectedImage } = this.state;
    
    return (
      <Fragment>
        <div className="gallery">
          {images.map((project, i) => (
            <figure className="gallery__item" key={project.node.id}>
              <a href={project.node.frontmatter.image.childImageSharp.fluid.src} alt={project.node.frontmatter.title} onClick={e => this.handleClick(e, i)}>
                <Img sizes={project.node.frontmatter.image.childImageSharp.fluid} />
                <figcaption>{project.node.frontmatter.title}</figcaption>
              </a>
            </figure>
          ))}
        </div>
        
        <div
          style={{ 
            opacity: showLightbox ? '1' : '0',
            visibility: showLightbox ? 'visible' : 'hidden'
          }} 
          className="lightbox-modal" 
          visible={showLightbox} onKeyUp={e => this.handleKeyUp(e)}>
            <div className="lightbox-modal__content">
              <img style={{ maxWidth: '100%'}} alt={images[selectedImage].node.frontmatter.title} src={images[selectedImage].node.frontmatter.image.childImageSharp.fluid.src} />
              <h2>{images[selectedImage].node.frontmatter.title}</h2>
              <div className="lightbox-modal__controls">
                <button onClick={this.closeModal}>Close</button>
                <div className="lightbox-modal__nav">
                  <button onClick={this.goBack} disabled={selectedImage === 0}>Previous</button>
                  <button onClick={this.goForward} disabled={selectedImage === images.length - 1}>Next</button>
                </div>
              </div>
            </div>
        </div>
      </Fragment>
    )
  }
}

export default Lightbox;