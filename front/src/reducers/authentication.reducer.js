import {userConstants} from "../constants/user.constants";
import {getRole} from "../helpers/utils";

let user = JSON.parse(localStorage.getItem('currentUser'));
const initialState = user ? { loggedIn: true, user } : {};

export function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: {
                    ...action.user,
                    roles: action.user.roles.map(val => getRole(val))
                }
            };
        case userConstants.LOGIN_FAILURE:
            return {loggedIn: false};
        case userConstants.LOGOUT:
            return {loggedIn: false};
        default:
            return state
    }
}