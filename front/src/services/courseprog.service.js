import httpCommon from "../http-common";

const baseUrl = "/api/courseprog"

const getAll = (employeeId, courseId) => {
    const emplPath = employeeId ? `employee=${employeeId}` : ''
    const coursePath = courseId ? `course=${courseId}` : ''
    const path = (emplPath || coursePath) ? "?"+[emplPath,coursePath].join("&") : "/"
    console.log("PPPPAPAPAPAPA",path)
    return httpCommon.get(baseUrl+path)
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

const CourseProgService = {
    getAll,
    get,
    create,
    update,
    remove
}

export default CourseProgService