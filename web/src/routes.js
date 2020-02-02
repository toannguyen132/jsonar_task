import React, { lazy } from 'react';
import {Redirect} from 'react-router-dom';
import {hasToken as isAuthenticated} from './utils/service';

const Customers = lazy(() => import('./pages/Customers'))

export const protect = (Component) => {
    return function(props) {
        return isAuthenticated() ? <Component {...props} /> :
            <Redirect to="/" />
    }
}

const routes = [
    {
        path: "/",
        exact: true,
        component: lazy(() => import('./pages/Home'))
    },
    {
        path: "/customers",
        render: protect(Customers)
    }
];

export default routes;