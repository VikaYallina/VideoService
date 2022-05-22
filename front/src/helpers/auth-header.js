import {authenticationService} from '../services/auth.service'

export function authHeader(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser && currentUser.accessToken)

    if (currentUser && currentUser.accessToken){
        return { "Authorization": `Bearer ${currentUser.accessToken}` };
    }else{
        return {};
    }
}