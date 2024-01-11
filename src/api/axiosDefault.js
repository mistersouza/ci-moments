import axios from "axios";

axios.defaults.baseURL = 'https://ci-drf-91470c2ccdce.herokuapp.com/'
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;