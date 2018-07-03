import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Table } from 'reactstrap';
import AuthService from '../../utils/AuthService';
import withAuth from '../../utils/withAuth';

class Profile extends Component {
    render() {
        const user = AuthService.get('user');

        return (
            <Layout title="Profile Page">
                <h1>Profile Page</h1>
                <p>Open <code>/pages/users/profile.js</code> to edit this file.</p>
                <Table>
                    <tr>
                        <th>ID</th>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                </Table>
            </Layout>
        );
    }
}

export default withAuth(Profile);