import { apiClientNoAuth, apiClientBasicAuth } from "./client.js";

const get = async (cancelToken)=>{
    const res = await apiClientNoAuth(cancelToken).get("/book");
    const books = res.data.books;
    console.log(books);
}

export default {
    get
}