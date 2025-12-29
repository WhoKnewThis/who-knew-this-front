import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.whoknewthis.site/api",
});

export default instance;
