import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = { isOpen: false };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <header>
                <Navbar color="dark" dark expand="md">
                    <Link href="/"><NavbarBrand href="">Next Boilerplate</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto navbar-nav">
                            <NavItem><Link href="/users/login"><NavLink href="">Login</NavLink></Link></NavItem>
                            <NavItem><Link href="/users/register"><NavLink href="">Register</NavLink></Link></NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;