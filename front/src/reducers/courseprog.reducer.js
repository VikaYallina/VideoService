import {
    CREATE_COURSEPROG,
    RETRIEVE_COURSEPROG,
    UPDATE_COURSEPROG,
    DELETE_COURSEPROG
} from "../actions/action-types";

const initState = []

function CourseProgReducer(courseprogs = initState, action){
    const {type, payload} = action
    switch (type) {
        case CREATE_COURSEPROG:
            return payload
        case RETRIEVE_COURSEPROG:
            return payload
        case UPDATE_COURSEPROG:
            return courseprogs.map((cp) =>{
                if (cp.c_id === payload.id){
                    return{
                        ...cp,
                        ...payload.data
                    }
                } else
                    return cp
            })
        case DELETE_COURSEPROG:
            return courseprogs.filter(( {c_id} ) => c_id !== payload.c_id)
        default:
            return courseprogs
    }
}

export default CourseProgReducer