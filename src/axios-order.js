import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://ultimate-burger-faf72.firebaseio.com/'
});

export default instance;