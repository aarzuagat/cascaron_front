<template>
  <div class="row q-pt-sm ">
    <div class="col-12">
      <div class="row ">
        <q-btn class="full-width" flat no-caps :to="{name:'home'}">
          <div class="row full-width">
            <div class="col-2 text-left">
              <q-icon name="mdi-view-dashboard" color="white"/>
            </div>
            <div class="col q-pl-md text-white text-left">
              <span>Dashboard</span>
            </div>
          </div>
        </q-btn>
      </div>
      <q-expansion-item
        expand-separator
        icon="mdi-storefront"
        label="Gestión de stock"
        class="full-width text-white"
        expand-icon-class="text-white"
        v-if="logged"
        default-opened
      >
        <div class="bg-dark-blue q-pl-xl text-blue-1">
          <StockListButton/>
          <ProductSell :menu_mode="true" @updated="$emit('updated')"/>
          <ProductSearch :categories="categories" :menu_mode="true"/>
        </div>
      </q-expansion-item>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductSell from "components/Product/ProductSell";
import ProductSearch from "components/Product/ProductSearch";
import StockListButton from "components/Stock/StockListButton";

export default {
  components: {StockListButton, ProductSearch, ProductSell},
  // name: 'ComponentName',
  computed: {
    ...mapGetters({
      logged: 'mystore/loggedIn'
    })
  },
  data() {
    return {
      categories: [],
    }
  }
}
</script>
