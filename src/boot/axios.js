import axios from 'axios'
import {Cookies} from "quasar";
import store from '../store'
import {n} from "src/utils/mynotify";
import Vue from "vue";


const axiosConfig = axios.create({
  baseURL: process.env.api,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});


axiosConfig.interceptors.request.use(
  request => {
    request.metadata = {startTime: new Date()};
    request.headers.authorization = 'Bearer ' + Cookies.get('lovetcgtoken');
    return request;
  },
  error => {
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
      const token = store().getters["mystore/accessToken"]
      const headers = {
        Authorization: 'Bearer ' + token,
      }
      if (token) {
        axiosConfig.post(`${process.env.api}auth/refresh?token=${token}`, {}, {headers}).then(response => {
          const accessToken = response.data.access_token
          Cookies.set('lovetcgtoken', accessToken)
          axiosConfig.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          axiosConfig._retry = true
          axiosConfig.request(error.config)
          // error.config._retry = true;
          // error.config.headers['Authorization'] = 'Bearer ' + accessToken;
          return axiosConfig(error.config)
          // store.
        }).catch(error => {
          console.log('error', error)
        })
      } else {
        store().dispatch('mystore/logoutUser').then(() => {
          n('Sesión caducada. Debe volver a autenticarse')
          window.location.replace('/')
        }).catch(error => {
          console.log(error)
        })
      }
      return;
    }
    if (error.response && error.response.status === 404) {
      const token = Cookies.get('lovetcgtoken')
      if (token)
        axiosConfig.post(`${process.env.api}auth/refresh?token=${token}`).then(response => {
          console.log(response)
          const accessToken = response.data
          // store.state().accessToken = accessToken
          // Cookies.set('djba_token', accessToken)
          axiosConfig._retry = true
          // store.
        }).catch(error => {
          console.log('error', error)
        })

      return;
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axiosConfig;

export default axiosConfig
