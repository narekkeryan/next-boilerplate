import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Layout from '../../components/layout';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '' };

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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <Layout title="Login Page">
                <h1>Login Page</h1>
                <p>Open <code>/pages/users/login.js</code> to edit this file.</p>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleUsernameChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <Button color="primary" type="submit">Login</Button>
                </Form>
            </Layout>
        );
    }
}

export default Login;