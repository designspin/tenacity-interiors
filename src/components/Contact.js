import React from 'react'
import { FaEnvelope, FaPhoneSquare, FaLocationArrow } from 'react-icons/fa';
const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                <form method="post" action="#">
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="special" /></li>
                        <li><input type="reset" value="Clear" /></li>
                    </ul>
                </form>
            </section>
            <section className="split">
                <section>
                    <div className="contact-method">
                        <h3><FaEnvelope /> Email</h3>
                        <a href="mailto:karl@tenacityinteriors.com">karl@tenacityinteriors.com</a><br/>
                        <a href="mailto:trevor@tenacityinteriors.com">trevor@tenacityinteriors.com</a>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <h3><FaPhoneSquare /> Phone</h3>
                        <span><a href="tel:01485 521888">01485 521888</a></span>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <h3><FaLocationArrow /> Address</h3>
                        <span>Unit 3, Waterford Industrial Estate<br />
                        Mill Lane<br />
                        Great Massingham<br />
                        King's Lynn<br />
                        Norfolk<br />
                        PE32 2HT</span>
                    </div>
                </section>
            </section>
        </div>
    </section>
)

export default Contact
