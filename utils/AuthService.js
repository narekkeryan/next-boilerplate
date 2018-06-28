'use strict';

import ServerRoutes from '../constants/ServerRoutes';
import ErrorMessages from '../constants/ErrorMessages';

class AuthService {
    static login() {
        const options = { // todo change options
            method: 'POST',
            headers: {
                'Content-Type': 'app'
            }
        };

        return fetch(ServerRoutes.LOGIN_URL, options)
            .then(response => response.json())
            .then(responseJson => {

            })
            .catch(error => console.error(error));
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
            .catch(error => console.error(error));
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
}

export default AuthService;