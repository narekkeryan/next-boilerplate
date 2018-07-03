import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import AuthService from '../utils/AuthService';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false, isLoggedIn: null, isLoading: true };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {
        const isLoggedIn = await AuthService.isLoggedIn();
        this.setState({ isLoggedIn: isLoggedIn, isLoading: false });
    }

    render() {
        return (
            <header>
                <Navbar color="dark" dark expand="md">
                    <Link href="/"><NavbarBrand href="">Next Boilerplate</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        { !this.state.isLoading ? (
                            this.state.isLoggedIn ?
                                (<Nav className="ml-auto navbar-nav">
                                    <NavItem><Link href="/users/profile"><NavLink href="">Profile</NavLink></Link></NavItem>
                                    <NavItem><Link href="/users/logout"><NavLink href="">Logout</NavLink></Link></NavItem>
                                </Nav>) :
                                (<Nav className="ml-auto navbar-nav">
                                    <NavItem><Link href="/users/login"><NavLink href="">Login</NavLink></Link></NavItem>
                                    <NavItem><Link href="/users/register"><NavLink href="">Register</NavLink></Link></NavItem>
                                </Nav>)
                        ) : null }
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;