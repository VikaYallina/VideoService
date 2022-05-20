import {authenticationService} from '../services/auth.service'

export function authHeader(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token){
        return { Authorization: 'Bearer ' + currentUser.token };
    }else{
        return {};
    }
}