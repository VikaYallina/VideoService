const initState = []

export default function LectureReducer(state=initState, action){
    const {type, payload} = action
    switch (type){
        case "lect/retrieve":
            return payload
        case "lect/add":
            return [...state, payload]
        case "lect/edit":
            return state.map(el => {
                if (el.id === payload.id)
                    return payload.lecture
                else
                    return el
            })
        case "lect/remove":
            return state.filter(val => val.id !== payload)
        default:
            return state
    }
}