import LectureService from "../services/lecture.service";

export const retrieveAllLecture = () => async (dispatch) =>{
    return LectureService.getAll()
        .then(res => {
            dispatch({
                type: "lect/retrieve",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err => {
            return Promise.reject(err.message)
        })
}

export const addLecture = (data) => async (dispatch) =>{
    return LectureService.create(data)
        .then(res => {
            dispatch({
                type: "lect/add",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch(err => {
            return Promise.reject(err.message)
        })
}

export const editLecture = (id, lecture) => async (dispatch) => {
    console.log(id, lecture)
    return LectureService.update(id, lecture)
        .then(() => {
            dispatch({
                type: "lect/edit",
                payload: {
                    id: id,
                    lecture: lecture
                }
            })
            console.log("almost complete")
            return Promise.resolve(lecture)
        })
        .catch(err => {
            console.log("ERRRRR", err)
            return Promise.reject(err)
        })
}

export const removeLecture = (id) => async (dispatch) => {
    return LectureService.remove(id)
        .then(res => {
            dispatch({
                type: "lect/remove",
                payload: id
            })
            return Promise.resolve(res.data)
        })
        .catch(err => {
            return Promise.reject(err.message)
        })
}