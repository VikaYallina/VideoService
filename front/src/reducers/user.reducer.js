const initState = {
    id:"fc3ff2d9-4e52-43ef-b0e9-d6983e960004",
    email:"n@mail.com",
    employee:{
        firstname:"Kirill"
    },
    role:"admin"
}

function UserReducer (state = initState, action){
    const {type, payload} = action;
    switch (type){
        case "user/add":
            return payload
        case "user/delete":
            return {}
        default:
            return state;
    }
}

export default UserReducer