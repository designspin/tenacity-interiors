import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

import Banner from '../components/Banner'
import Testimonials from '../components/Testimonials';
import pic01 from '../assets/images/kitchens.jpg'
import pic02 from '../assets/images/bedrooms.jpg'
import pic03 from '../assets/images/Vanity-Unit.jpg'
import pic04 from '../assets/images/furniture.jpg'
import pic05 from '../assets/images/karl-andrews.png'

class HomeIndex extends React.Component {
    render() {
        return (
            <Layout>
                <Helmet
                    title="Kitchens, Bedrooms & Vanity Units, Handmade in Norfolk by Tenacity Interiorss"
                    meta={[
                        { name: 'description', content: "Based in Great Massingham, Norfolk, Tenacity Interiors' experienced cabinetmakers will create handmade bespoke kitchens and furniture which is as unique as you" },
                        { name: 'keywords', content: 'sample, something' },
                    ]}
                >
                </Helmet>

                <Banner />

                <div id="main">
                    <section className="paper">
                        <div className="inner">
                            <div className="grid-wrapper">
                                <div className="col-4 box alt">
                                    <h2>Why Choose Us?</h2>
                                    <ul className="alt">
                                        <li><i className="fa fa-fw fa-check-square"></i>Each project is hand-crafted from the outset</li>
                                        <li><i className="fa fa-fw fa-check-square"></i>The best available materials from established and exotic sources</li>
                                        <li><i className="fa fa-fw fa-check-square"></i>Every detail of your project will be perfect, whatever style you choose</li>
                                    </ul>
                                </div>
                                <div className="col-8">
                                    <h2>Kind Customer Words</h2>
                                    <Testimonials />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="tiles">
                        <article style={{backgroundImage: `url(${pic01})`}}>
                            <header className="major">
                                <h3>Kitchens</h3>
                                <p>Hand-Crafted, as Individual as You</p>
                            </header>
                            <Link to="/handmade-kitchens" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic02})`}}>
                            <header className="major">
                                <h3>Bedrooms</h3>
                                <p>Hand-Made Fitted Bedrooms</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic03})`}}>
                            <header className="major">
                                <h3>Vanity Units</h3>
                                <p>Hand-Made Specifically For You</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic04})`}}>
                            <header className="major">
                                <h3>Furniture</h3>
                                <p>We Design and Deliver Hand Made Furniture You Need</p>
                            </header>
                            <Link to="/landing" className="link primary"></Link>
                        </article>
                    </section>

                    <section>
                        <div className="inner">
                            <header className="major">
                                <h2>A Reputation For Excellence</h2>
                            </header>
                            <div className="grid-wrapper">
                                <div className="col-8">
                                    <p>Tenacity Interiors has an outstanding reputation for excellence, with installations in the heart of London and New York’s most fashionable districts. Owners Karl Andrews &amp; Trevor Pragg also take pride in being a local company creating beautiful rooms for homes across East Anglia.</p>
                                    <p>As a private client or interior design professional, you will be able to rely on the skills, dedication and care that every project always receives. Tenacity Interiors experts can offer original designs or replicate existing furniture for you, for any room, whatever style you have in mind.</p>
                                </div>
                                <div className="col-4 complimentary">
                                    <p className="col-8">To book your complimentary design consultation today call Karl on <a href="tel:01485 521888"><strong>01485 521888</strong></a></p>
                                    <img className="col-4" src={pic05} alt="Karl Andrews" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default HomeIndex