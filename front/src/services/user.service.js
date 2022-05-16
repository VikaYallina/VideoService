import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';
import httpCommon from "../http-common";

export const userService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { headers: authHeader() };
    return httpCommon.get(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { headers: authHeader() };
    return httpCommon.get(`/users/${id}`, requestOptions).then(handleResponse);
}