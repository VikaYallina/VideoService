import {userConstants} from "../constants/user.constants";
import {userService} from "../services/user.service";
import {authenticationService} from "../services/auth.service";
import {history} from "../helpers/history";

export const loginAction = (email, password) => async (dispatch) => {
    dispatch({
        type: userConstants.LOGIN_REQUEST,
        user: {
            email
        }
    })

    authenticationService.login(email, password)
        .then(
            user => {
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    user
                });
                history.push('/dashboard');
            }
        )
        .catch(error => {
            console.log(error.message)
            dispatch({
                type: userConstants.LOGIN_FAILURE,
                error
            });
        });
}

export const logoutAction = () => async (dispatch) => {
    authenticationService.logout();
    history.push("/login")
    dispatch({ type: userConstants.LOGOUT });
}