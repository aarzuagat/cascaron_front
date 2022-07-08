import axios from 'axios'
import Vue from 'vue'
import {Cookies} from "quasar";


const axiosConfig = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});
axiosConfig.interceptors.request.use(
  request => {
    request.metadata = {startTime: new Date()};
    // if (request.url.includes('/login')) {
    request.headers.authorization = 'Bearer ' + Cookies.get('love_token');
    // }
    return request;
  },
  error => {
    console.log('must login',error)
    if (error.response.status === 404) {
      throw new Error(`${error.config.url} not found`);
    }
    return Promise.reject(error);
  }
);


axiosConfig.interceptors.response.use(
  (response) => {
    response.metadata = {
      'duration': new Date() - response.config.metadata.startTime
    };
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.location.replace('/logout')
      // const token = Cookies.get('djba_token')
      // const headers = {
      //   Authorization: 'Bearer ' + token,
      // }
      // if (token) {
      //   axiosConfig.post(`${backURL()}auth/refresh?token=${token}`, {}, {headers}).then(response => {
      //     const accessToken = response.data.access_token
      //     store.state().accessToken = accessToken
      //     Cookies.set('djba_token', accessToken)
      //     axiosConfig._retry = true
      //     // store.
      //   }).catch(error => {
      //     console.log('error', error)
      //   })
      // }
      return;
    }
    if (error.response && error.response.status === 419) {
      console.log('debo autenticarme ahoraaa');
      return;
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axiosConfig;

// export default axiosConfig
