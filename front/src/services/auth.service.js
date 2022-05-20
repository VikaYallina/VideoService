import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';
import httpCommon from "../http-common";
import {getRole} from "../helpers/utils";
import axios from "axios";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {return currentUserSubject.value}
}

function login(email, password){
    console.log("here")
    const body = JSON.stringify({email, password})

    return axios.post(`http://localhost:8080/api/auth/signin`, body)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify({...user, roles: user.roles.map(val => getRole(val))}));
            currentUserSubject.next(user);
            console.log(user)

            return user;
        })
}

function logout(){
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}