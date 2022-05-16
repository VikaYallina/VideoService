import {
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    DELETE_EMPLOYEE,
    DELETE_ALL_EMPLOYEES
} from "./action-types";

import EmployeeService from "../services/employee.service";

export const createEmployee = (employee) => async (dispatch) => {
    try {
        const res = await EmployeeService.create(employee);
        dispatch({
            type: CREATE_EMPLOYEE,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const retrieveEmployees = () => async (dispatch) => {
    try {
        const res = await EmployeeService.getAll();
        dispatch({
            type: RETRIEVE_EMPLOYEES,
            payload: res,
        });
    } catch (err) {
        console.log(err);
    }
};


export const updateEmployee = (id, data) => async (dispatch) => {
    try {
        const res = await EmployeeService.update(id, data);
        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const deleteEmployee = (id) => async (dispatch) => {
    try {
        await EmployeeService.remove(id);
        dispatch({
            type: DELETE_EMPLOYEE,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};
export const deleteAllEmployees = () => async (dispatch) => {
    try {
        const res = await EmployeeService.removeAll();
        dispatch({
            type: DELETE_ALL_EMPLOYEES,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
