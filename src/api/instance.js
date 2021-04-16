import axios from 'axios'

import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

export default instance
