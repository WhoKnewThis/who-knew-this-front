import axios from 'axios';

const instance = axios.create({
  baseURL: "https://www.whoknewthis.site/api",
});

export default instance;
