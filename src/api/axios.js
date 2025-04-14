import axios from "axios";

export default axios.create({
    baseURL:"https://dddp.gov.gh/api",
    auth: {
        username: 'msow',
        password: 'dpGhana@2022'
    }
});