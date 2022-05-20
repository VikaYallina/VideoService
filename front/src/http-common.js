import axios from "axios";
import {authHeader} from "./helpers/auth-header";

let headers = authHeader()
headers["Content-type"] = "application/json"
// export default axios.create({
//     baseURL:"http://localhost:8080",
//     headers:{
//         "Content-type": "application/json"
//     }
// });

export default axios.create({
    baseURL:"http://localhost:8080",
    headers
});