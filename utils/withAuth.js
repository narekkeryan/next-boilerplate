'use strict';

import React, { Component } from 'react';
import Router from 'next/router';
import Loader from '../components/loader';
import AuthService from './AuthService';

export default function withAuth(Component) {
    return class Authenticated extends Component {
        constructor(props) {
            super(props);

            this.state = { isLoading: true };
        }

        async componentWillMount() {
            if (!await AuthService.isLoggedIn()) {
                Router.replace('/users/login');
            } else {
                this.setState({ isLoading: false });
            }
        }

        render() {
            return (
                <div>
                    { this.state.isLoading ? <Loader /> : <Component {...this.props} /> }
                </div>
            );
        }
    }
}