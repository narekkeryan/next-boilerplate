'use strict';

const PROXY_URL = 'http://localhost:5000';

let ROUTES = {
    LOGIN_URL: '/v1/users/login',
    REGISTER_URL: '/v1/users/register',
    IS_UNIQUE_URL: '/v1/users/is-unique',
    IS_LOGGED_IN_URL: '/v1/users/is-logged-in',
    ACTIVATE_URL: '/v1/users/activate'
};

Object.keys(ROUTES).forEach(key => ROUTES[key] = PROXY_URL + ROUTES[key]);

module.exports = ROUTES;