import axios from 'axios';

 const instanceAxios = axios.create({
  baseURL: 'https://dummyjson.com',  // Base URL for the API
});
export default instanceAxios;