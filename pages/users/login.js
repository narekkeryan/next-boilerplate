import React, { Component } from 'react';
import Router from 'next/router';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import Layout from '../../components/layout';
import withoutAuth from '../../utils/withoutAuth';
import AuthService from '../../utils/AuthService';
import ErrorMessages from '../../constants/ErrorMessages';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '', error: '', warning: '' };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = (({ username, password }) => ({ username, password }))(this.state);
        const result = await AuthService.login(data);

        if (result === true) {
            Router.replace('/');
        } else if (result === false) {
            this.setState({ warning: ErrorMessages['err.connection.refused'] });
        } else {
            this.setState({ error: ErrorMessages[result] });
        }
    }

    render() {
        return (
            <Layout title="Login Page">
                <h1>Login Page</h1>
                <p>Open <code>/pages/users/login.js</code> to edit this file.</p>
                { !!this.state.error.length && <Alert color="danger">{this.state.error}</Alert> }
                { !!this.state.warning.length && <Alert color="warning">{this.state.warning}</Alert> }
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleUsernameChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <Button color="primary" type="submit">Login</Button>
                </Form>
            </Layout>
        );
    }
}

export default withoutAuth(Login);