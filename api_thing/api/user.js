import { create } from "apisauce";
import { apiClientNoAuth, apiClientBasicAuth } from "./client.js";


const get = async (email, password, cancelToken) =>{
    let error, user;

    const res = await apiClientBasicAuth(email, password, cancelToken).get("/user");

    if (res.ok) {
        user = res.data;
    } else if (res.status === 401) {
        error = "Invalid Email/Password Combo";
    } else {
        error = "An Unexpected Error Occurred. Please Try Again Later";
    }

    return {
        error,
        user
    }
}


/** User:   
 * "email" : STRING,   
 * "first_name" : STRING,   
 * "last_name" : STRING   
 * "password" : STRING,
*/
const post = async (user, cancelToken)=>{
    const res = await apiClientNoAuth(cancelToken).post("/user", user, {});
    // console.log(res);
    if (res.ok) {
        console.log("We good");
    } else if (res.originalError.response.status == 422) {
        console.log("That use already has an account!");
    } else {
        console.log(`Somethin' wrong happened. Error Status: ${res.originalError.response.status}`);
    }
}

const put = async (email, password, new_user, cancelToken)=>{
    let error, user;

    const res = await apiClientBasicAuth(email, password, cancelToken).put("/user", new_user);

    if (res.ok) {
        user = res.data;
    } else {
        error = "An Unexpected Error Occurred. Please Try Again Later";
    }

    return {
        error,
        user
    }
}

const del = async (email, password, cancelToken)=>{
    const res = await apiClientBasicAuth(email, password, cancelToken).delete("/user");
    
    return res.data;
}


export default {
    get,
    post,
    put,
    del
}
