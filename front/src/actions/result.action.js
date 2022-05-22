import QuizResultService from "../services/result.service";

export const addResult = (result) => async (dispatch) =>{
    // TODO: save to db
    // const resId = 1
    // dispatch({
    //     type: "result/add",
    //     payload: {
    //         resultId:resId,
    //         result
    //     }
    // })
    // return Promise.resolve(resId)
    return QuizResultService.create(result)
        .then((res) => {
            dispatch({
                type: "result/add",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err => {
            console.log(err.response.data.message)
            return Promise.reject(err.message)
        })
}

export const retrieveAllResults = () => async (dispatch) => {
    return QuizResultService.getAll()
        .then(res => {
            dispatch({
                type: "result/retrieve",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err.message)
        })
}

export const deleteResult = (id) => async (dispatch) => {
    return QuizResultService.deleteById(id)
        .then(res => {
            dispatch({
                type: "result/remove",
                payload: id
            })
            return Promise.resolve()
        })
        .catch(err => {
            console.log(err)
            return Promise.reject(err.message)
        })
}
