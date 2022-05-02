import {
    RETRIEVE_QUIZ,
    UPDATE_QUIZ,
    DELETE_QUIZ,
    CREATE_QUIZ
} from "../actions/action-types";

const initState = []

function QuizReducer(state = initState, action) {
    const {type, payload} = action
    switch (type) {
        case "quiz/retrieve":
            return payload
        case "quiz/add":
            return [...state, payload]
        case "quiz/update":
            return state.map(value => {
                return (value.id === payload.id) ? payload : value
            })
        case "quiz/remove":
            return state.filter((q) => q.id !== payload)
        default:
            return state
    }
}

export default QuizReducer