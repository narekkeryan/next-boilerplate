import React, { Component } from 'react';
import Layout from '../../components/layout';
import withAuth from '../../utils/withAuth';

class Profile extends Component {
    render() {
        return (
            <Layout title="Profile Page">
                <h1>Profile Page</h1>
                <p>Open <code>/pages/users/profile.js</code> to edit this file.</p>
                <div className="">name: </div>
            </Layout>
        );
    }
}

export default withAuth(Profile);