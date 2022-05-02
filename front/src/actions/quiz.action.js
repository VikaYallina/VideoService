import QuizService from "../services/quiz.service";

export const retrieveAllQuiz = () => async (dispatch) =>{
    return QuizService.getAll()
        .then((resp) => {
            console.log(resp.data)
            dispatch({
                type: "quiz/retrieve",
                payload: resp.data
            })
            return resp.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}

export const retrieveQuizById = (id) => async (dispatch) => {
    // TODO: API call
    dispatch({
        type:"quiz/retrieve"
    })
}

export const addQuiz = (data) => async (dispatch) =>{
    return QuizService.create(data)
        .then((res) => {
            dispatch({
                type:"quiz/add",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
}

export const updateQuiz = (id, quiz) => async (dispatch) => {
    return QuizService.update(id, quiz)
        .then((res) => {
            dispatch({
                type: "quiz/update",
                payload: {
                    id,
                    quiz
                }
            })
            return Promise.resolve(quiz)
        })
        .catch((err) => {
            console.log(err)
            Promise.reject(err)
        })
}

export const removeQuiz = (id) => async (dispatch) =>{
    return QuizService.remove(id)
        .then((resp) => {
            dispatch({
                type: "quiz/remove",
                payload: id
            })
            return resp.data
    })
        .catch((err) => {
            console.log(err)
            return err
        })
}