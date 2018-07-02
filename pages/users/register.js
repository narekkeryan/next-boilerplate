import React, { Component } from 'react';
import Router from 'next/router';
import { Alert, Button, Modal, ModalBody } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import Layout from '../../components/layout';
import AuthService from '../../utils/AuthService';
import ErrorMessages from '../../constants/ErrorMessages';
import Messages from '../../constants/Messages';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = { username: '', email: '', password: '', rePassword: '', errors: {}, warning: '', modal: false };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
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

    handleRePasswordChange(e) {
        this.setState({ rePassword: e.target.value });
    }

    async handleSubmit() {
        const data = (({ username, email, password, rePassword }) => ({ username, email, password, rePassword }))(this.state);

        const result = await AuthService.register(data);

        if (result === true) {
            this.setState({ modal: !this.state.modal });
            setTimeout(() => Router.replace('/'), 5000);
        } else if (result === false) {
            this.setState({ warning: ErrorMessages['err.connection.refused'] });
        } else {
            this.setState({ errors: result });
        }
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        const validationRules = {
            username: {
                required: { errorMessage: ErrorMessages['err.username.required'] },
                pattern: { value: '^[A-Za-z0-9._]+$', errorMessage: ErrorMessages['err.username.pattern'] },
                minLength: { value: 4, errorMessage: ErrorMessages['err.username.length.from.4.to.32'] },
                maxLength: { value: 32, errorMessage: ErrorMessages['err.username.length.from.4.to.32'] },
                async: AuthService.isUnique
            },
            email: {
                required: { errorMessage: ErrorMessages['err.email.required'] },
                email: { value: true, errorMessage: ErrorMessages['err.email.invalid'] },
                async: AuthService.isUnique
            },
            password: {
                required: { errorMessage: ErrorMessages['err.password.required'] },
                minLength: { value: 6, errorMessage: ErrorMessages['err.password.length.from.6'] }
            },
            rePassword: {
                required: { errorMessage: ErrorMessages['err.rePassword.required'] },
                match: { value: 'password', errorMessage: ErrorMessages['err.rePassword.match'] }
            }
        };

        return (
            <Layout title="Register Page">
                <h1>Register Page</h1>
                <p>Open <code>/pages/users/register.js</code> to edit this file.</p>
                { !!Object.keys(this.state.errors).length && (
                    <div>
                        { Object.keys(this.state.errors).map(key => {
                            return <Alert color="danger">{ErrorMessages[this.state.errors[key]['msg']]}</Alert>
                        }) }
                    </div>
                ) }
                { !!this.state.warning.length && <Alert color="warning">{this.state.warning}</Alert> }
                <AvForm onValidSubmit={this.handleSubmit}>
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
                        <AvField type="password" name="rePassword" id="rePassword" placeholder="Confirm Password" validate={validationRules.rePassword} onChange={this.handleRePasswordChange} />
                    </AvGroup>
                    <Button color="primary" type="submit">Register</Button>
                </AvForm>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="false">
                    <ModalBody dangerouslySetInnerHTML={{__html: Messages['successfully.registered']}} />
                </Modal>
            </Layout>
        );
    }
}

export default Register;