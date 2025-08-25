import axios from "axios";

const instance = axios.create({
    // baseURL:"https://dddp.gov.gh/api",
    baseURL:"http://localhost:8086/dddp/api/v1/",
    auth: {
        username: 'admin',
        password: 'sow12345'
    }
});

export default instance;