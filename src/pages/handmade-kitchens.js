import React from 'react';
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/BannerLanding'

const Kitchens = (props) => (
    <Layout>
        <Helmet>
            <title>Landing - Forty by HTML5 UP</title>
            <meta name="description" content="Landing Page" />
        </Helmet>

        <Banner 
            title="Hand-Crafted Norfolk Kitchens, as Individual as You"
            introText="IF YOU LOOKING FOR A KITCHEN THAT IS WONDERFUL TO LOOK AT AND A JOY TO COOK OR SOCIALISE IN, TENACITY INTERIORS WILL DESIGN THE PERFECT ‘HEART OF THE HOME’ FOR YOU, YOUR FAMILY AND YOUR FRIENDS TO ENJOY." />
    </Layout>
)

export default Kitchens