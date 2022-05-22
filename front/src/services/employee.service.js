import httpCommon from "../http-common";
import {handleResponse} from "../helpers/handle-response";
import {authHeader} from "../helpers/auth-header";

const baseUrl = "/api/employee"
const getAll = () => {
    return httpCommon.get(baseUrl + "/").then(handleResponse)
}

const get = id => {
    return httpCommon.get(baseUrl+`/${id}`);
};
const create = data => {
    return httpCommon.post("/api/auth/signup", data);
};
const update = (id, data) => {
    return httpCommon.put(baseUrl+`/${id}`, data);
};
const remove = id => {
    return httpCommon.delete(baseUrl+`/${id}`);
};
const removeAll = () => {
    return httpCommon.delete(baseUrl+`/`);
};

const EmplService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
}

export default EmplService