import React from 'react';
import Observer from 'react-intersection-observer';
import { NavConsumer } from './layout';

const BannerDefault = (props) => (
    <NavConsumer>
        {({ trigger }) => (
            <Observer 
                tag="header" 
                className="major"
                threshold={0}
                onChange={(inView) => { trigger(!inView)}}>
                    <h1>{props.title}</h1>
            </Observer>
        )}
    </NavConsumer>
    
)

export default BannerDefault;