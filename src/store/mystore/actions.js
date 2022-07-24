import {objectToFormData} from "src/utils/utils";
import axiosConfig from "boot/axios";

export function loginUser(context, credentials) {

  return new Promise((resolve, reject) => {
    axiosConfig.post('/auth/login', objectToFormData(credentials))
      .then(response => {
        context.commit('updateLocalStorage', {
          access: response.data.access_token
        });
        context.dispatch('getDataUser', response.data.access_token);
        resolve(response)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function logoutUser(context) {
  console.log('estoy loggin out')
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      context.commit('destroyToken');
      resolve(true);
    })
  }
}


export function getDataUser(context, token) {
  return new Promise((resolve, reject) => {
    axiosConfig.post('/auth/me')
      .then(response => {
        context.commit('SetUser', response.data);
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function setCookiesAccept(context) {
  context.commit('SetCookiesAccept', true);
}
