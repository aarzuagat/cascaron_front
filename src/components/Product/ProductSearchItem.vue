<template>
  <div class="row">
    <div class="col text-left">{{ product.name }}</div>
    <div class="col text-center">{{ formatterCurrency(product.sell_price) }}</div>
    <div class="col text-center">{{ formatterCurrency(product.cost_price) }}</div>
    <div class="col">{{ product.category.name }}</div>
    <div class="col-1 text-center" v-if="loggedIn">
      <div class="row q-gutter-sm bg-darkless-blue text-center" >
        <ProductEdit @updated="$emit('updated')" class="col" :lite-version="true" :product-new="product"
                     v-if="user.role_id === 1"/>
        <ProductDelete @updated="$emit('updated')" class="col" :lite-version="true" :product-new="product"
                       v-if="user.role_id === 1"/>
      </div>
    </div>
  </div>
</template>
<script>
import {formatCurrency} from "src/utils/utils";
import ProductEdit from "components/Product/ProductEdit";
import ProductDelete from "components/Product/ProductDelete";
import {mapGetters} from "vuex";

export default {
  components: {ProductDelete, ProductEdit},
  // name: 'ComponentName',
  props: {
    product: {type: Object}
  },
  computed: {
    ...mapGetters({
      loggedIn: 'mystore/loggedIn',
      user: 'mystore/user',
    })
  },
  data() {
    return {}
  },
  methods: {
    formatterCurrency(amount) {
      return formatCurrency(amount);
    }
  }
}
</script>
