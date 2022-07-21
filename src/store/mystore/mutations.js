import {Cookies} from 'quasar'


export const updateLocalStorage = (state, {access}) => {
  Cookies.set('lovetcgtoken', access, {expires: '8h', path: '/'});
  state.accessToken = access;
};
export const destroyToken = (state) => {
  Cookies.remove('lovetcgtoken');
  Cookies.remove('lovetcguser');
  state.accessToken = state.user = null;
};

export const SetUser = (state, access) => {
  Cookies.set('lovetcguser', access, {expires: '8h 5m', path: '/'});
  state.user = access;
};

export const SetCookiesAccept = (state, value) => {
  Cookies.set('loveCookies', value, {path: '/', expires: '100h 5m',});
  state.Cookies_accepted = value;
};

