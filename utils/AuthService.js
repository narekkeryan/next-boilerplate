'use strict';

import ServerRoutes from '../constants/ServerRoutes';

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
}

export default AuthService;