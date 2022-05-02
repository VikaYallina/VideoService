import{
    CREATE_EMPLOYEE,
    RETRIEVE_EMPLOYEES,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    DELETE_ALL_EMPLOYEES
} from "../actions/action-types";

const initState = []

function EmployeeReducer(employees = initState, action){
    const {type, payload} = action
    switch (type) {
        case CREATE_EMPLOYEE:
            return [...employees, payload]
        case RETRIEVE_EMPLOYEES:
            return payload
        case UPDATE_EMPLOYEE:
            return employees.map((empl) =>{
                if (empl.id === payload.id){
                    return{
                        ...empl,
                        ...payload
                    }
                } else
                    return empl
            })
        case DELETE_EMPLOYEE:
            return employees.filter(( {id} ) => id !== payload.id)
        case DELETE_ALL_EMPLOYEES:
            return [];
        default:
            return employees
    }
}

export default EmployeeReducer