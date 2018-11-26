import React from 'react'
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby';

import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Contact from './Contact'
import Footer from './Footer'

const LayoutQuery = graphql`
    query LayoutQuery {
        markdownRemark(fileAbsolutePath: {regex: "/(settings)/"}) {
            frontmatter {
                phone
            }
        }
    }
`;

const NavContext = React.createContext({});
export const NavProvider = NavContext.Provider;
export const NavConsumer = NavContext.Consumer;

const Meta = ({ metaTitle, metaDescription }) =>
    <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
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
        const { children } = this.props

        return (
            <>
                <Meta metaTitle={this.props.metaTitle} metaDescription={this.props.metaDescriptions} />
                <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                    <NavProvider value={{ trigger: this.handleRevealMenu, revealed: this.state.isNavRevealed }}>
                        <div id="wrapper">
                            <Header 
                                phone={this.props.data.phone} 
                                onToggleMenu={this.handleToggleMenu} 
                                isNavRevealed={this.state.isNavRevealed} />
                            {children}
                            <Contact />
                            <Footer />
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

            switch(props.templateKey) {
                default:
                    return <Layout data={data} {...props} />
            }
    }} />

export default LayoutComponent
