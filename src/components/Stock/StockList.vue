<template>
  <div class="row text-white dark-blue">
    <div class="col-12">
      <q-input
        v-model="name"
        :disable="!stocks_all.length "
        dense
        label="Filtrar"
        label-color="white"
        input-class="text-white q-pa-sm"
        @input="filterStock"
        debounce="500"
        clearable
        @clear="name = ''"
      />
    </div>
    <div v-if="stocks.length" class="col-12">

      <StockListItem
        v-for="(item,index) in stocks.slice(start,end)"
        :key="item.id"
        :product="item"
        :number="index+1"
        :categories="categories"
        :products="products"
        @updated="findStock"
      />
    </div>
    <div class="col-12" v-else>
      <NoData/>
    </div>
    <div class="col-12 text-center q-py-sm" v-if="stocks.length > 20">
      <q-btn
        label="Ver más"
        @click="end+= 10"

      />
    </div>
  </div>
</template>
<script>
import {getStock} from "src/store/Stock/stock";
import StockListItem from "components/Stock/StockListItem";
import NoData from "components/Extras/NoData";
import {getCategories} from "src/store/Category/categories";
import {getProducts} from "src/store/Product/products";

export default {
  components: {NoData, StockListItem},
  // name: 'ComponentName',
  data() {
    return {
      stocks: [],
      stocks_all: [],
      start: 0,
      end: 20,
      name: '',
      categories: [],
      products: [],
    }
  },
  methods: {
    filterStock() {
      if (!this.stocks_all.length || !this.name) {
        this.stocks = this.stocks_all
        return false
      }
      this.stocks = this.stocks_all.filter(i => i.name.toLowerCase().includes(this.name.toLowerCase()))
    },
    async findStock() {
      const all = await getStock()
      this.stocks = this.stocks_all = all.data.data.sort((a, b) => a.quantity < b.quantity)
      await this.findCategories()
    },
    async findCategories() {
      this.categories = await getCategories(false)
    },
    async findProducts() {
      const products = await getProducts();
      if (products.status < 400) {
        this.products = products.data.data

      }
    },
  },
  mounted() {
    this.findStock()
    this.findProducts()
  }
}
</script>
<style lang="sass">
.bt
  border-top: 1px solid $darkless-blue

.q-field__append, .q-field__suffix, .q-field__native, .q-field__input
  color: white

</style>
