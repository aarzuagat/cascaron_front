
import {Cookies} from 'quasar'

import SimpleCrypto from "simple-crypto-js"
import {user} from "src/store/mystore/getters";


export default function () {
  return {
    user: Cookies.get('lovetcguser'),
    accessToken: Cookies.get('lovetcgtoken'),
    cookies_accepted: Cookies.get('loveCookies'),
  }
}

