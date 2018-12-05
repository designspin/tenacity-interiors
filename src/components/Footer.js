import React from 'react'
import { Link } from 'gatsby'
import { FaFacebook, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
            <div className="grid-wrapper">
                <div className="col-4">
                    <h4>Hand Made In Norfolk</h4>
                    <ul className="alt">
                        <li><Link to="/handmade-kitchens">Kitchens</Link></li>
                        <li><Link to="/fitted-bedrooms">Bedrooms</Link></li>
                        <li><Link to="/vanity-units">Vanity Units</Link></li>
                        <li><Link to="/bespoke-furniture">Furniture</Link></li>
                        <li><Link to="/interior-designers-architects">Information For Interior Designers</Link></li>
                        <li><Link to="/interior-designers-architects">Information for Architects / Developers</Link></li>
                    </ul>
                </div>
                <div className="col-4">
                    <h4>Site Information</h4>
                    <ul className="alt">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/accessibility">Accessibility</Link></li>
                        <li><Link to="/sitemap">Sitemap</Link></li>
                    </ul>
                </div>
                <div className="col-4">
                    <h4>Tenacity Interiors Limited</h4>
                    <p>
                        Registered Office: <br />
                        <address>
                        {props.address.adr1}<br />
                        {props.address.adr2}<br />
                        {props.address.adr3}<br />
                        {props.address.town}<br />
                        {props.address.postcode}<br />
                        </address>
                    </p>
                    <p>
                        Registered company No.{props.regnumber}<br />
                        VAT No: {props.vatnumber}
                    </p>
                </div>
            </div>
            <ul className="icons">
                <li><a href={props.social.facebook} aria-label="Visit us on Facebook" className="icon icon--facebook"><FaFacebook /></a></li>
                <li><a href={props.social.linkedin} aria-label="Connect with Karl on Linked in" className="icon icon--linkedin"><FaLinkedin /></a></li>
                <li><a href={props.social.youtube} aria-label="See videos on Youtube" className="icon icon--youtube"><FaYoutubeSquare /></a></li>   
            </ul>
            <ul className="copyright">
                <li>&copy; Tenacity Interiors Ltd {(new Date().getFullYear())}</li>
            </ul>
        </div>
    </footer>
)

export default Footer
