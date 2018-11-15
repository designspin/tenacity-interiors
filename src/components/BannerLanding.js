import React from 'react'
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
                <div className="inner">
                    <header className="major">
                        <h1>{props.title}</h1>
                    </header>
                    <div className="content">
                        <p>{props.introText}</p>
                    </div>
                </div>
            </Observer>
        )}
    </NavConsumer>
    
)

export default BannerLanding
