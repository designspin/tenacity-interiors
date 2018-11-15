import React from 'react'
import PropTypes from 'prop-types'

import '../assets/scss/main.scss'
import Header from './Header'
import Menu from './Menu'
import Contact from './Contact'
import Footer from './Footer'

const NavContext = React.createContext({});
export const NavProvider = NavContext.Provider;
export const NavConsumer = NavContext.Consumer;

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
            <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <NavProvider value={{ trigger: this.handleRevealMenu, revealed: this.state.isNavRevealed }}>
                    <div id="wrapper">
                        <Header onToggleMenu={this.handleToggleMenu} isNavRevealed={this.state.isNavRevealed} />
                        {children}
                        <Contact />
                        <Footer />
                    </div>
                </NavProvider>
                <Menu onToggleMenu={this.handleToggleMenu} />
            </div>
        )
    }
}

export default Layout
