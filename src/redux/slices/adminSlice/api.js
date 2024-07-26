import axios from "axios";

const api = axios.create({
    baseURL:"backend.treato.in/api/v1"
})

export default api