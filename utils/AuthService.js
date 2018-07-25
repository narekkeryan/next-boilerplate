import Router from 'next/router';
import ServerRoutes from '../constants/ServerRoutes';
import ErrorMessages from '../constants/ErrorMessages';

class AuthService {
    static login(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(ServerRoutes.LOGIN_URL, options)
            .then(response => response.json())
            .then(responseJson => {
                if ('user' in responseJson && 'token' in responseJson) {
                    AuthService.set('user', responseJson.user);
                    AuthService.set('token', responseJson.token);
                    return true;
                }
                return responseJson.message;
            })
            .catch(error => false);
    }

    static register(data) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        return fetch(ServerRoutes.REGISTER_URL, options)
            .then(response => response.json())
            .then(responseJson => {
                if ('errors' in responseJson) {
                    return responseJson.errors;
                }
                return true;
            })
            .catch(error => false);
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Router.replace('/');
    }

    static isUnique(value, ctx, input, cb) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ param: input.props.id, value: value })
        };

        return fetch(ServerRoutes.IS_UNIQUE_URL, options)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson === false) {
                    cb(ErrorMessages[`err.${input.props.id}.unique`]);
                }
                cb(true);
            })
            .catch(error => {
                console.error(error);
                cb(true);
            });
    }

    static isLoggedIn() {
        const token = AuthService.get('token');
        if (!!Object.keys(token).length) {
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.access}`
                }
            };

            return fetch(ServerRoutes.IS_LOGGED_IN_URL, options)
                .then(response => response.json())
                .then(responseJson => responseJson)
                .catch(error => console.log(error));
        }
        return false;
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item): {};
    }
}

export default AuthService;
