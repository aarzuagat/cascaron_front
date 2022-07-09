
import {Cookies} from 'quasar'

import SimpleCrypto from "simple-crypto-js"
import {user} from "src/store/mystore/getters";


export default function () {
  return {
    user: Cookies.get('merzuser'),
    accessToken: Cookies.get('merztoken'),
    cookies_accepted: Cookies.get('merzcookies'),
  }
}

