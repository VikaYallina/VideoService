import {VideoService} from '../services/video.service'
import QuizService from "../services/quiz.service";

export const retrieveVideos = () => async (dispatch) =>{
    return VideoService.getAll()
        .then((resp) => {
            dispatch({
                type: "video/retrieve",
                payload: resp.data
            })
            return resp.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}


export const addVideo = (data) => async (dispatch) =>{
    return VideoService.create(data)
        .then((res) => {
            dispatch({
                type:"video/add",
                payload: res.data
            })
            return Promise.resolve(res.data)
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
}

export const updateVideo = (id, video, config) => async (dispatch) => {
    return VideoService.update(id, video, config)
        .then((res) => {
            dispatch({
                type: "video/update",
                payload: {
                    id,
                    video
                }
            })
            return Promise.resolve(video)
        })
        .catch((err) => {
            console.log(err)
            Promise.reject(err)
        })
}

export const removeVideo = (id) => async (dispatch) =>{
    return VideoService.deleteById(id)
        .then((resp) => {
            dispatch({
                type: "video/remove",
                payload: {id}
            })
            return resp.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
}