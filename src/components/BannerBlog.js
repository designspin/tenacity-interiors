import React from 'react';
import Img from 'gatsby-image';
import Observer from 'react-intersection-observer';
import { NavConsumer } from './layout';

const BannerLanding = (props) => (
    <NavConsumer>
        {({ trigger }) => (
            <Observer 
                tag="section" 
                id="banner" 
                className="style2"
                threshold={0}
                onChange={(inView) => { trigger(!inView)}}>
                <Img 
                    alt={props.title}
                    sizes={props.mainImage}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%"
                    }} />
                <div className="inner">
                    <header className="major">
                        <h1>{props.title}</h1>
                        Posted: <time>{props.date}</time>
                    </header>
                </div>
            </Observer>
        )}
    </NavConsumer>
    
)

export default BannerLanding
