import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import Layout from '../../components/layout';
import AuthService from '../../utils/AuthService';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', email: '', password: '', errors: {} };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getError(property) {
        if (property in this.state.errors) {
            return this.state.errors[property]['msg'];
        }
    }

    hasError(property) {
        if (property in this.state.errors) {
            return { invalid: true };
        }
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    async handleSubmit() {
        const data = (({ username, email, password }) => ({ username, email, password }))(this.state);

        const result = await AuthService.register(data) || {};

        if (result === true) {
            // todo do something
            console.log('registered, redirect');
        } else {
            this.setState({ errors: result });
        }
    }

    render() {
        const validationRules = {
            username: {
                required: { errorMessage: 'Username is required' },
                pattern: { value: '^[A-Za-z0-9._]+$', errorMessage: 'Your username must be composed only with letter, numbers, dot and underscore' },
                minLength: { value: 4, errorMessage: 'Your username must be between 6 and 16 characters' },
                maxLength: { value: 32, errorMessage: 'Your username must be between 6 and 16 characters' }
            },
            email: {
                required: { errorMessage: 'Email is required' },
                email: { value: true, errorMessage: 'Your email is not valid' }
            },
            password: {
                required: { errorMessage: 'Password is required' },
                minLength: { value: 6, errorMessage: 'Your password must be at least 6 characters length' }
            },
            rePassword: {
                required: { errorMessage: 'Confirm Password is required' },
                match: { value: 'password', errorMessage: 'Confirm Password must match Password' }
            }
        };

        return (
            <Layout title="Register Page">
                <h1>Register Page</h1>
                <p>Open <code>/pages/users/register.js</code> to edit this file.</p>
                <AvForm onSubmit={this.handleSubmit}>
                    <AvGroup>
                        <AvField type="text" name="username" id="username" placeholder="Username" validate={validationRules.username} onChange={this.handleUsernameChange} />
                    </AvGroup>
                    <AvGroup>
                        <AvField type="email" name="email" id="email" placeholder="Email" validate={validationRules.email} onChange={this.handleEmailChange} />
                    </AvGroup>
                    <AvGroup>
                        <AvField type="password" name="password" id="password" placeholder="Password" validate={validationRules.password} onChange={this.handlePasswordChange} />
                    </AvGroup>
                    <AvGroup>
                        <AvField type="password" name="rePassword" id="rePassword" placeholder="Confirm Password" validate={validationRules.rePassword} />
                    </AvGroup>
                    <Button color="primary" type="submit">Register</Button>
                </AvForm>
            </Layout>
        );
    }
}

export default Register;