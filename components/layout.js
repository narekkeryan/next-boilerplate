import React, { Component } from 'react';
import Head from 'next/head';
import Header from './header';
import '../stylesheets/main.scss';

class Layout extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>{ this.props.title || 'Hello from Next.js' }</title>
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <Header />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;