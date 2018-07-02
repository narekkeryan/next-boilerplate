import React, { Component } from 'react';
import Layout from './layout';

class Loader extends Component {
    render() {
        return (
            <Layout title="Loading...">
                <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Layout>
        );
    }
}

export default Loader;