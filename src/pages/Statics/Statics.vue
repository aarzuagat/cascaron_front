<template>
  <div class="row text-white dark-blue">

    <div class="col-12">
      <MyTitle title="Estadísticas de ventas"/>
    </div>
    <div class="col-12">
      <div class="row q-gutter-sm items-center justify-center">
        <div class="col-12 col-md flex-center flex text-center">
          <q-input class="no-padding full-width" v-model="date_start" filled dense
                   label="Fecha inicio" label-color="white"
                   :rules="[$rules.required()]">
            <template v-slot:append>
              <q-icon name="mdi-calendar"
                      class="cursor-pointer" color="white">
                <q-popup-proxy ref="qDateProxy2" transition-show="scale"
                               transition-hide="scale">
                  <q-date v-model="date_start" minimal mask="DD/MM/YYYY"
                          @input="closeCalendar('qDateProxy2')"
                          :options="optionStartFilter">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar"
                             color="primary"
                             flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md text-center flex flex-center">
          <q-input class="no-padding full-width" v-model="date_end" filled dense
                   label="Fecha final" label-color="white"
          >
            <template v-slot:append>
              <q-icon name="mdi-calendar"
                      class="cursor-pointer" color="white">
                <q-popup-proxy ref="qDateProxy" transition-show="scale"
                               transition-hide="scale">
                  <q-date v-model="date_end" minimal mask="DD/MM/YYYY"
                          @input="closeCalendar('qDateProxy')"
                          :options="optionEndFilter">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar"
                             color="primary"
                             flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </div>
        <div class="col-12 col-md text-center flex flex-center">
          <q-btn no-caps dense label="Filtrar" icon="mdi-filter" @click="findStock"/>
        </div>

      </div>
    </div>
    <div v-if="stocks.length" class="col-12">
      <ColumnChart
        :dataseries="columnSeries[1]"
        :categories="columnSeries[0]"
        title="Ventas por productos"
        :key="key"
      />
    </div>
    <div v-if="incidents.length" class="col-12">
      <ColumnChart
        :dataseries="columnSeriesIncidents[1]"
        :categories="columnSeriesIncidents[0]"
        title="Incidentes"
        :key="key"
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
import {filterStock} from "src/store/Stock/stock";
import StockListItem from "components/Stock/StockListItem";
import NoData from "components/Extras/NoData";
import StockOperationList from "components/StockOperation/StockOperationList";
import MyTitle from "components/Extras/MyTitle";
import {date} from "quasar";
import ColumnChart from "components/Graphs/ColumnChart";
import {formatDate, uniques} from "src/utils/utils";
import {filterIncident} from "src/store/Incident/incident";

export default {
  components: {ColumnChart, MyTitle, StockOperationList, NoData, StockListItem},
  computed: {
    columnSeries() {
      const products = uniques(this.stocks.map(i => i.lote.product.name))
      let dataseries = []
      const stocks_filtered = this.stocks.filter(i => i.quantity > 0).sort((a, b) => a.quantity > b.quantity)
      products.forEach(i => {
        const item = {
          name: i,
          data: [stocks_filtered.filter(y => y.lote.product.name === i).map(y => y.quantity).reduce((a, b) => a + b, 0)]
        }
        dataseries.push(item)
      })
      console.log(dataseries)
      return [['Productos'], dataseries];
    },
    columnSeriesIncidents() {
      const products = uniques(this.incidents.map(i => i.author))
      let dataseries = []
      products.forEach(i => {
        const item = {
          name: i,
          data: [this.incidents.filter(y => y.author === i).length]
        }
        dataseries.push(item)
      })
      console.log(dataseries)
      return [['Trabajadores'], dataseries];
    }
  },
  data() {
    return {
      incidents: [],
      stocks: [],
      stocks_all: [],
      start: 0,
      end: 20,
      name: '',
      categories: [],
      products: [],
      date_start: '',
      date_end: '',
      filtered: false,
      key: 0
    }
  },
  methods: {
    closeCalendar(name) {
      this.filtered = true
      this.$refs[name].hide()
    }, optionStartFilter(date2) {
      let ts = Date.now();
      let formattedString = date.formatDate(ts, 'YYYY/MM/DD');
      return date2 <= formattedString;
    },
    optionEndFilter(date2) {
      this.filtered = true
      let ts = formatDate(this.date_start);
      let now = Date.now();
      let formattedString = date.formatDate(ts, 'YYYY/MM/DD');
      let formattedString2 = date.formatDate(now, 'YYYY/MM/DD');
      return date2 >= formattedString && date2 <= formattedString2;
    },

    filterStock() {
      if (!this.stocks_all.length || !this.name) {
        this.stocks = this.stocks_all
        return false
      }
      this.stocks = this.stocks_all.filter(i => i.name.toLowerCase().includes(this.name.toLowerCase()))
    },
    async findStock() {
      let sd = this.date_start
      if (!this.filtered)
        sd = '1/1/2010'
      const de = this.date_end
      const obj = {
        start: sd,
        end: de,
      }
      const all = await filterStock(obj)
      this.stocks = this.stocks_all = all
      this.key++
    },
    async findIncidents() {
      let sd = this.date_start
      if (!this.filtered)
        sd = '1/1/2010'
      const de = this.date_end
      const obj = {
        start: sd,
        end: de,
      }
      this.incidents = await filterIncident(obj)
      this.key++
    },
  },
  mounted() {
    this.date_start = date.formatDate(Date.now(), 'DD/MM/YYYY')
    this.date_end = date.formatDate(Date.now(), 'DD/MM/YYYY')
    this.findStock()
    this.findIncidents()
  }
}
</script>
<style lang="sass">
.bt
  border-top: 1px solid $darkless-blue

.q-field__append, .q-field__suffix, .q-field__native, .q-field__input
  color: white

</style>
