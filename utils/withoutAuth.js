import React from 'react';
import Router from 'next/router';
import Loader from '../components/loader';
import AuthService from './AuthService';

export default function withoutAuth(Component) {
    return class NotAuthenticated extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isLoading: true };
        }

        async componentDidMount() {
            if (await AuthService.isLoggedIn()) {
                Router.replace('/');
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
