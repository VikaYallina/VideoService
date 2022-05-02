import httpCommon from "../http-common";

const baseUrl = "/api/employee"
const getAll = () => {
    return httpCommon.get(baseUrl + "/")
}

const get = id => {
    return httpCommon.get(baseUrl+`/${id}`);
};
const create = data => {
    return httpCommon.post(baseUrl+"/", data);
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