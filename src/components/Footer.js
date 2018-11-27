import React from 'react'
import { Link } from 'gatsby'

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
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/accessibility">Accessibility</Link></li>
                        <li><Link to="/sitemap">Sitemap</Link></li>
                    </ul>
                </div>
                <div className="col-4">
                    <h4>Tenacity Interiors Limited</h4>
                    <p>
                        Registered Office: <br />
                        Unit 3, Waterford Industrial Estate <br />
                        Mill Lane <br />
                        Great Massingham <br />
                        King's Lynn <br />
                        PE32 2HT <br />
                    </p>
                    <p>
                        Registered company No.04914295<br />
                        VAT No: 875 7623 77
                    </p>
                </div>
            </div>
            <ul className="icons">
                <li><a href="https://www.facebook.com/tenacityinteriors" className="icon alt alt--square fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="https://www.linkedin.com/in/karl-andrews-a8022159/" className="icon alt alt--square fa-linkedin"><span className="label">LinkedIn</span></a></li>
                <li><a href="https://www.youtube.com/channel/UCes99-lSbNJjQgvzcPmdezg" className="icon alt alt--square fa-youtube"><span className="label">Youtube</span></a></li>   
            </ul>
            <ul className="copyright">
                <li>&copy; Tenacity Interiors Ltd {(new Date().getFullYear())}</li>
            </ul>
        </div>
    </footer>
)

export default Footer
