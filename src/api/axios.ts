import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://158.180.68.123/api'  
});

export default instance;
