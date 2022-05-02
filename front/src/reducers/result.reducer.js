const initState = []

function ResultReducer(state = initState,action){
    const {type, payload} = action
    // switch (type) {
    //     case "result/update":
    //         console.log(payload)
    //         return {...state,
    //         [payload.result.userId]:{
    //             ...state[payload.result.userId],
    //             [payload.result.quizId]: {
    //                 ...state[payload.result.userId][payload.result.quizId],
    //                 [payload.resultId]:payload.result
    //             }
    //     }}
    //     case "result/add":
    //         if (state[payload.result.userId]){
    //             if (state[payload.result.quizId]){
    //                 return {...state,
    //                     [payload.result.userId]:{
    //                         ...state[payload.result.userId],
    //                         [payload.result.quizId]:{
    //                             ...state[payload.result.quizId],
    //                             [payload.resultId]: payload.result
    //                         }
    //                     }}
    //             }else {
    //                 return {...state,
    //                     [payload.result.userId]:{
    //                         ...state[payload.result.userId],
    //                         [payload.result.quizId]:{
    //                             [payload.resultId]: payload.result
    //                         }
    //                     }}
    //             }
    //         }else{
    //             return {...state,
    //             [payload.result.userId]:{
    //                 [payload.result.quizId]:{
    //                     [payload.resultId]: payload.result
    //                 }
    //             }}
    //         }
    //     default:
    //         return state;
    //
    // }

    switch (type) {
        case "result/add":
            return [...state, payload]
        case "result/retrieve":
            return payload
        case "result/remove":
            return state.filter(val => val.id !== payload)
        default:
            return state
    }
}

export default ResultReducer