import axios from "axios";

const instance = axios.create({
    baseURL: "https://ultimate-burger-faf72.firebaseio.com/"
});

export default instance;
