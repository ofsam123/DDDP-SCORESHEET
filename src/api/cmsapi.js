import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:8086/dddp/api/v1/",
    //  baseURL:"https://dddpadminportal.aoinnovations.org/dddp/api/v1/",
    auth: {
        username: 'admin',
        password: 'sow12345'
    }
});

export default instance;