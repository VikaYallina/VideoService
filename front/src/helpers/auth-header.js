import {authenticationService} from '../service/authentication.service'

export function authHeader(){
    // Add authService
    const currentUser = authenticationService.currentUserValue;

    if (currentUser && currentUser.token){
        return { Authorization: 'Bearer ' + currentUser.token };
    }else{
        return {};
    }
}