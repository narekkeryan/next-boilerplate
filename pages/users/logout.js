import React, { Component } from 'react';
import Router from 'next/router';
import Loader from '../../components/loader';
import AuthService from '../../utils/AuthService';

class Logout extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (await AuthService.isLoggedIn()) {
            AuthService.logout();
        } else {
            Router.replace('/');
        }
    }

    render() {
        return (
            <Loader />
        );
    }
}

export default Logout;