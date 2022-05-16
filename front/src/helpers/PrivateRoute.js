import React from 'react'
import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import AccessDeniedPage from "../components/AccessPages/AccessDeniedPage";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    let auth = useSelector(state => state.currentUser)
    return(<Route {...rest} render={props => {
        let user = JSON.parse(localStorage.getItem('currentUser'))

        if (!auth.loggedIn && !user){
            return(<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
        }

        if (!user.roles.every(el => {return roles.includes(el)})){
            return(<AccessDeniedPage/>)
        }

        return(<Component {...props} />)

    }} />)
}



// (
//     localStorage.getItem('currentUser')
//         ? <Component {...props} />
//         : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
// )