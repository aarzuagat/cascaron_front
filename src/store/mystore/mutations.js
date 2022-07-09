/*
export function someMutation (state) {
}

*/
import {Cookies} from 'quasar'

const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
export const updateLocalStorage = (state, {access}) => {
  cookies.set('merztoken', access, {expires: '8h 5m', path: '/'});
  state.accessToken = access;
};

export const destroyToken = (state) => {
  cookies.remove('merztoken');
  cookies.remove('merzuser');
  state.accessToken = state.user = null;
};

export const SetUser = (state, access) => {
  cookies.set('merzuser', access, {expires: '8h 5m', path: '/'});
  state.user = access;
};

export const SetCookiesAccept = (state, value) => {
  cookies.set('merzcookies', value, {path: '/',expires: '100h 5m',});
  state.cookies_accepted = value;
};

