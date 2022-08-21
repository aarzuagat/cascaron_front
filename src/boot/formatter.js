import {Notify} from 'quasar'
import Vue from "vue";
import {formatCurrency, formatDate, formatDateTime} from "src/utils/utils";

const formatterCurrency = value => {
  return formatCurrency(value)
}

const formatterDate = value => {
  return formatDate(value)
}

const formatterDateTime = value => {
  return formatDateTime(value)
}
Vue.prototype.$formatterCurrency = formatterCurrency;
Vue.prototype.$formatterDate = formatterDate;
Vue.prototype.$formatterDateTime = formatterDateTime;



