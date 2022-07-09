import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export function loginUser(context, credentials) {

  return new Promise((resolve, reject) => {
    let obj = new FormData();
    obj.append('email', credentials.username);
    obj.append('password', credentials.password);
    axiosConfig.post('/auth/login', obj)
      .then(response => {
        context.dispatch('getDataUser', {
          access: response.data.access_token
        });
        context.commit('updateLocalStorage', {
          access: response.data.access_token
        });
        resolve(response)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function logoutUser(context) {
  if (context.getters.loggedIn) {
    return new Promise((resolve, reject) => {
      context.commit('destroyToken');
      resolve(true);
    })
  }
}


export function getDataUser(context, data) {
  return new Promise((resolve, reject) => {
    axiosConfig.post('/auth/me' + '?token=' + data.access)
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
