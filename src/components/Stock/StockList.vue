<template>
  <div class="row text-white dark-blue">
    <div class="col-12">
      <q-input
        v-model="name"
        :disable="!stocks.length "
        dense
        label="Filtrar"
        label-color="white"
        input-class="text-white"
        @input="filterStock"
        debounce="500"

      />
    </div>
    <div v-if="stocks.length" class="col-12">

      <StockListItem v-for="(item,index) in stocks.slice(start,end)" :key="item.id" :product="item" :number="index+1"
                     :categories="categories" @updated="findStock"/>
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
      categories: []
    }
  },
  methods: {
    filterStock() {
      this.stocks = this.stocks_all.filter(i => i.name.toLowerCase().includes(this.name.toLowerCase()))
    },
    async findStock() {
      const all = await getStock()
      this.stocks = this.stocks_all = all.data.data.sort((a, b) => a.quantity < b.quantity)
      await this.findCategories()
    },
    async findCategories() {
      this.categories = await getCategories(false)
    }
  },
  mounted() {
    this.findStock()
  }
}
</script>
<style lang="sass">
.bt
  border-top: 1px solid $darkless-blue
</style>
