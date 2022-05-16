import {authenticationService} from "../services/auth.service"

export function handleResponse(response) {
    const data = response.data
    console.log(data)

    if (!(response.status === 200)) {
        console.log("HHHE")
        if ([401, 403].indexOf(response.status) !== -1) {
            authenticationService.logout();
            window.location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}