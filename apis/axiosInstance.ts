import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '',
  params: {
    api_key: '',
    token: '',
    // ...
  },
});

export default axiosInstance;
