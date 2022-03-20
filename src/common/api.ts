import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://ediscovery.inabia.ai/api',
  headers: {
    'Content-type': 'application/json'
  }
});

export enum API {
  AddCase = '/addcase'
}

export default Axios;
