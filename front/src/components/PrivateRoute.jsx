import React from 'react';
import { authenticationService } from '../service/authentication.service'
import {Route, Navigate } from 'react-router-dom';

export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        // if not logged in
        if (!currentUser){
            return <Navigate to={{ pathname:'/login', state: {from: props.location}}} />
        }

        // check if route is restricted by current role
        if ( roles && roles.indexOf(currentUser.role) === -1){
            return <Navigate to={{pathname: '/'}}/>
        }

        return <Component {...props} />
    }} />
)