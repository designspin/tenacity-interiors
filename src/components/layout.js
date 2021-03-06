import React from 'react'
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';


import 'flexboxgrid-sass'
import '../assets/scss/main.scss'

import Header from './Header'
import Menu from './Menu'
import Footer from './Footer'

const LayoutQuery = graphql`
    query LayoutQuery {
        markdownRemark(fileAbsolutePath: {regex: "/(settings)/"}) {
            frontmatter {
                phone
                regnumber
                vatnumber
                address {
                    adr1
                    adr2
                    adr3
                    county
                    postcode
                    town
                }
                team {
                    email
                    name
                }
                social {
                    facebook
                    linkedin
                    youtube
                }
                shareimage {
                    childImageSharp {
                        fixed(width: 1200, height: 630) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        }
    }
`;

const NavContext = React.createContext({});
export const NavProvider = NavContext.Provider;
export const NavConsumer = NavContext.Consumer;

const Meta = ({ metaTitle, metaDescription, metaImage, metaPageUrl }) =>
    <Helmet>
        <html lang="en" />
        <title>{metaTitle}</title>
        <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,Symbol"></script>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content="Tenacity Interiors Ltd" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        { 
            metaImage && <meta property="og:image" content={metaImage} />
        }
        <meta property="og:url" content={metaPageUrl} />
        <meta property="twitter:card" content="summary_large_image" />
    </Helmet>

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMenuVisible: false,
            isNavRevealed: false,
            loading: 'is-loading'
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
        this.handleRevealMenu = this.handleRevealMenu.bind(this)
    }

    componentDidMount () {
        this.timeoutId = setTimeout(() => {
            this.setState({loading: ''});
        }, 100);
    }

    componentWillUnmount () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    handleToggleMenu() {
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })
    }

    handleRevealMenu(visible) {
        this.setState({
            isNavRevealed: visible
        })
    }

    render() {
        
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                settings: this.props.data
            })
        })


        return (
            <>
                <Meta 
                    metaTitle={this.props.metaTitle} 
                    metaDescription={this.props.metaDescription} 
                    metaImage={(this.props.metaImage) ? this.props.siteUrl + this.props.metaImage : this.props.siteUrl + this.props.data.shareimage.childImageSharp.fixed.src} 
                    metaPageUrl={this.props.metaPageUrl} />
                <div className={`body ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                    <NavProvider value={{ trigger: this.handleRevealMenu, revealed: this.state.isNavRevealed }}>
                        <div id="wrapper">
                            <Header 
                                phone={this.props.data.phone} 
                                onToggleMenu={this.handleToggleMenu} 
                                isNavRevealed={this.state.isNavRevealed} />
                            {children}
                            <Footer 
                                address={this.props.data.address} 
                                regnumber={this.props.data.regnumber}
                                vatnumber={this.props.data.vatnumber}
                                social={this.props.data.social}/>
                        </div>
                    </NavProvider>
                    <Menu onToggleMenu={this.handleToggleMenu} />
                </div>
            </>
        );
    }
}

const LayoutComponent = (props) =>
    <StaticQuery
        query={ LayoutQuery }
        render={ result => {
            const data = result.markdownRemark.frontmatter;
            const { meta } = result;
            
            switch(props.templateKey) {
                default:
                    return <Layout data={data} {...props} />
            }
    }} />

export default LayoutComponent
