import axios from "axios";
import {authHeader} from "./helpers/auth-header";


export default axios.create({
    baseURL:"http://localhost:8080",
    headers:{
        "Content-type": "application/json",
        ...authHeader()
    }
});
