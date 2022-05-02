import httpCommon from "../http-common";

const baseUrl = "/api/video"

function getData(id) {
    return httpCommon.get(baseUrl + `/${id}/data`)
}

function getAll() {
    return httpCommon.get(baseUrl + '/')
}

function create(body) {
    return httpCommon.post(baseUrl + '/', body)
}

function update(id, body, configs) {
    return httpCommon.post(baseUrl + `/${id}`, body, configs)
}

function deleteById(id) {
    return httpCommon.delete(baseUrl + `/${id}`)
}

export const VideoService = {
    getData,
    getAll,
    create,
    update,
    deleteById
}