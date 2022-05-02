import httpCommon from "../http-common";

const baseUrl = "/api/quizres"

const getAll = () => {
    return httpCommon.get(baseUrl+"/")
}

const get = id => {
    return httpCommon.get(baseUrl+`/${id}`);
};

const create = data => {
    return httpCommon.post(baseUrl+"/", data);
};

const deleteById = id => {
    return httpCommon.delete(baseUrl+`/${id}`)
}

const QuizResultService = {
    getAll,
    get,
    create,
    deleteById
}

export default QuizResultService