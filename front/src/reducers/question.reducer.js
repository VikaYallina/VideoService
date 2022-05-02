const initState = []

function QuestionReducer(state = initState, action){
    const {type, payload} = action
    switch (type) {
        case "question/update_result":
            return state;
        default:
            return state;
    }
}

export default QuestionReducer