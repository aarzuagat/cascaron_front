import scrypto from "src/store/crypto";

export function loggedIn(state) {
  return state.accessToken != null
}

export function accessToken(state) {
  return state.accessToken
}

export function user(state) {
  return state.user
}

export function cookiesAccept(state) {
  return state.cookies_accepted === true
}

