import React from 'react';
import ReactSlick from 'react-slick';

const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
}
const Testimonials = (props) => (
    <ReactSlick {...settings}>
        <figure className="testimonial">
            <blockquote>
                I have commissioned various items for my specific use. 
                The items were of the highest quality &amp; of a unique design. 
                Karl carried out these commissions &amp; produced what was required to the highest specification.
            </blockquote>
            <footer>
                <cite>- <strong>Terrence Cole,</strong> <em>London</em></cite>
            </footer>
        </figure>
        <figure className="testimonial">
            <blockquote>
                Tenacity Interiors were the perfect joinery company to use when refurbishing my house. 
                I have been most impressed with the supply &amp; manufacture of bespoke kitchen units. 
                The fitting &amp; after-care service have been exemplary.
            </blockquote>
            <footer>
                <cite>- <strong>Jenny Carter</strong></cite>
            </footer>
        </figure>
    </ReactSlick>
)

export default Testimonials;