const initState = []

function VideoReducer(state = initState, action) {
    const {type, payload} = action

    switch (type){
        case "video/retrieve":
            return payload
        case "video/add":
            return [...state, payload]
        case "video/update":
            return state.map(val => {
                if (val.id === payload.id){
                    return payload.video
                }else{
                    return val
                }
            })
        case "video/remove":
            return state.filter(val => val.id !== payload.id)
        default:
            return state
    }
}

export default VideoReducer