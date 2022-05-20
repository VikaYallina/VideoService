import {
    CREATE_COURSEPROG,
    RETRIEVE_COURSEPROG,
    UPDATE_COURSEPROG,
    DELETE_COURSEPROG
} from "./action-types";

import CourseProgService from "../services/courseprog.service";

export const createCourseProg = (data) => async (dispatch) => {
    try {
        const res = await CourseProgService.create(data);
        dispatch({
            type: CREATE_COURSEPROG,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveCourseProg = (employeeId, courseId) => async (dispatch) => {
    try {
        const res = await CourseProgService.getAll(employeeId, courseId);
        console.log(res)
        dispatch({
            type: RETRIEVE_COURSEPROG,
            payload: res.data,
        });

        return Promise.resolve(res.data)
    } catch (err) {
        console.log(err);
    }
};


export const updateCourseProg = (id, data) => async (dispatch) => {
    try {
        const res = await CourseProgService.update(id, data);
        dispatch({
            type: UPDATE_COURSEPROG,
            payload: {id, data},
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteCourseProg = (id) => async (dispatch) => {
    try {
        await CourseProgService.remove(id);
        dispatch({
            type: DELETE_COURSEPROG,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

