'use strict';

const PROXY_URL = 'http://localhost:5000';

let ROUTES = {
    LOGIN_URL: '/v1/users/login',
    REGISTER_URL: '/v1/users/register'
};

Object.keys(ROUTES).forEach(key => ROUTES[key] = PROXY_URL + ROUTES[key]);

module.exports = ROUTES;