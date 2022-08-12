import { CancelToken } from 'apisauce';
import userAPI from "./api/user.js";
import bookAPI from "./api/book.js";
// import apiCat from './api/apiCategory.js'
// import apiItem from './api/apiItem.js'


const source = CancelToken.source();
// source.token returns the cancel token

const login = async (cancelToken)=>{
    const { user, error } = await userAPI.get('kevinb@codingtemple.com', '123', cancelToken)
    console.log(error ? error : "It works")
    console.log(user)
}
// login(source.token);

const register = async (cancelToken)=>{
    const res = await userAPI.post({ 
        email: "cobyylinemi@gmail.com",
        first_name: "Jacoby",
        last_name: "Yliniemi",
        password: "123"
    }, source.token);
    console.log(res);
}
// register(source.token);

const updateUser = async (cancelToken)=>{
    const { user, error } = await userAPI.put("cobyyliniemi@gmail.com", "yliniemi", { first_name: "Jacobyyyy" }, source.token)
    console.log(
        error ?
        error :
        "It works?!?!",
        user
    )
}
// updateUser();

const delUser = async (cancelToken)=>{
    let res = await userAPI.del();
    console.log(res);
}
// delUser(source.token);

const getBook = async (cancelToken)=>{
    bookAPI.get(cancelToken);
}
// getBook(source.token);