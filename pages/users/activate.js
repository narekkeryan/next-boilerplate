import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import Layout from '../../components/layout';
import ServerRoutes from '../../constants/ServerRoutes';
import Messages from '../../constants/Messages';
import ErrorMessages from '../../constants/ErrorMessages';

class Activate extends Component {
    constructor(props) {
        super(props);
        this.state = { flag: '', message: '' };
    }

    async componentDidMount() {
        const url = new URL(window.location.href);
        const _id = url.searchParams.get('id');
        const _hash = url.searchParams.get('hash');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, _hash })
        };

        try {
            const response = await fetch(ServerRoutes.ACTIVATE_URL, options);
            const responseJson = await response.json();

            if (responseJson) {
                this.setState({ flag: 'success', message: Messages['account.activated'] });
            } else {
                this.setState({ flag: 'danger', message: Messages['account.not.activated'] });
            }
        } catch (error) {
            this.setState({ flag: 'warning', message: ErrorMessages['err.connection.refused'] });
        }
    }

    render() {
        return (
            <Layout title="Activate your account">
                <h1>Confirming Email</h1>
                { this.state.flag === 'success' && <Alert color="success"><div dangerouslySetInnerHTML={{__html: this.state.message}} /></Alert> }
                { this.state.flag === 'danger' && <Alert color="danger"><div dangerouslySetInnerHTML={{__html: this.state.message}} /></Alert> }
                { this.state.flag === 'warning' && <Alert color="warning"><div dangerouslySetInnerHTML={{__html: this.state.message}} /></Alert> }
            </Layout>
        );
    }
}

export default Activate;