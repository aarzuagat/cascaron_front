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
      <div class="row text-bold q-py-sm">
        <div class="col-1  text-center">No</div>
        <div class="col ">Nombre</div>
        <div class="col-2 text-center">Stock</div>
        <div class="col-3 "> Acciones</div>
      </div>
      <div class="row">
        <div class="col-12" v-for="(item,index) in stocks.slice(start,end)" :key="item.id">
          <StockListItem :product="item" :number="index+1"/>
        </div>
      </div>
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

export default {
  components: {NoData, StockListItem},
  // name: 'ComponentName',
  data() {
    return {
      stocks: [],
      stocks_all: [],
      start: 0,
      end: 20,
      name: ''
    }
  },
  methods: {
    filterStock() {
      this.stocks = this.stocks_all.filter(i => i.name.toLowerCase().includes(this.name.toLowerCase()))
    },
    async findStock() {
      const all = await getStock()
      console.log(all)
      this.stocks = this.stocks_all = all.data.data
    }
  },
  mounted() {
    this.findStock()
  }
}
</script>
