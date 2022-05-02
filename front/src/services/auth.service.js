import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';
import httpCommon from "../http-common";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {return currentUserSubject.value}
}

function login(username, password){
    const body = JSON.stringify({username, password})

    httpCommon.post(`/users/authenticate`, body)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
}

function logout(){
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}