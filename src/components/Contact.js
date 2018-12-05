import React from 'react'
import { FaEnvelope, FaPhoneSquare, FaLocationArrow } from 'react-icons/fa';

export const ContactAlt = (props) => (
    <section>
        <div className="inner">
        <div className="grid-wrapper">
            <div className="col-4">
                <h3><FaEnvelope /> Email</h3>
                <a href="mailto:karl@tenacityinteriors.com">karl@tenacityinteriors.com</a><br/>
                <a href="mailto:trevor@tenacityinteriors.com">trevor@tenacityinteriors.com</a>
            </div>
            <div className="col-4">
                <h3><FaPhoneSquare /> Phone</h3>
                <span><a href="tel:01485 521888">01485 521888</a></span>
            </div>
            <div className="col-4">
                <h3><FaLocationArrow /> Address</h3>
                <span>Unit 3, Waterford Industrial Estate<br />
                Mill Lane<br />
                Great Massingham<br />
                King's Lynn<br />
                Norfolk<br />
                PE32 2HT</span>
            </div>
        </div>
        </div>
    </section>
); 

const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                <h2>Finding Tenacity Interiors in Great Massingham, Norfolk</h2>
                <p>Here at the Tenacity Interiors workshops in Great Massingham, Norfolk, we have ‘time-served’ specialists who will work with you to transform your ideas into beautiful, stylish reality.{' '} 
                From traditional styles to ultra-modern concepts, you can have every confidence that, whatever the size of the project, we will create outstanding results.</p>
                <div style={{paddingBottom: '50%', position: 'relative', height: 0, overflow: 'hidden'}} >
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d154348.23468794156!2d0.6701702328491209!3d52.809905431127724!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d786984d265851%3A0x2ce2797d48aff155!2sTenacity+Interiors!5e0!3m2!1sen!2suk!4v1405610545667" />
                </div>
            </section>
            <section className="split">
                <section>
                    <div className="contact-method">
                        <h3><FaEnvelope /> Email</h3>
                        <a href={`mailto:${props.settings.team[0].email}`}>{props.settings.team[0].email}</a><br/>
                        <a href={`mailto:${props.settings.team[1].email}`}>{props.settings.team[1].email}</a>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <h3><FaPhoneSquare /> Phone</h3>
                        <span><a href={`tel:${props.settings.phone}`}>{props.settings.phone}</a></span>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <h3><FaLocationArrow /> Address</h3>
                        <address>{props.settings.address.adr1}<br />
                        {props.settings.address.adr2}<br />
                        {props.settings.address.adr3}<br />
                        {props.settings.address.town}<br />
                        {props.settings.address.county}<br />
                        {props.settings.address.postcode}</address>
                    </div>
                </section>
            </section>
        </div>
    </section>
)

export default Contact
