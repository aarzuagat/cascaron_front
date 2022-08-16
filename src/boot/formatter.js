import {Notify} from 'quasar'
import Vue from "vue";
import {formatCurrency, formatDate} from "src/utils/utils";

const formatterCurrency = value => {
  return formatCurrency(value)
}

const formatterDate = value => {
  return formatDate(value)
}
Vue.prototype.$formatterCurrency = formatterCurrency;
Vue.prototype.$formatterDate = formatterDate;



