import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // 여기에 실제 API 기본 URL을 입력하세요.
});

export default instance;
