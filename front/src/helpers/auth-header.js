import {authenticationService} from '../services/auth.service'

export function authHeader(){
    const currentUser = authenticationService.currentUserValue;

    if (currentUser && currentUser.token){
        return { Authorization: 'Bearer ' + currentUser.token };
    }else{
        return {};
    }
}