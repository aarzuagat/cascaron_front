<template>
  <div class="row text-white dark-blue">
    <div class="col-12">
      <div class="row items-center">
        <div class="col-12 col-sm-10">
          <q-input class="no-padding full-width" v-model="date_start" filled dense
                   label="Fecha" label-color="white"
                   @input="findStock"
                   :rules="[$rules.required()]">
            <template v-slot:append>
              <q-icon name="mdi-calendar"
                      class="cursor-pointer" color="white">
                <q-popup-proxy ref="qDateProxy2" transition-show="scale"
                               transition-hide="scale">
                  <q-date v-model="date_start" minimal mask="DD/MM/YYYY"
                          @input="closeCalendar('qDateProxy2'); findStock"
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
        <div class="col-12 col-sm text-center">
          <q-btn no-caps dense label="Filtrar" icon="mdi-filter" @click="findStock"/>
        </div>
      </div>
    </div>
    <div class="col-12">
      <MyTitle title="Listado de operaciones realizadas"/>
    </div>
    <div v-if="stocks.length" class="col-12">
      <StockOperationList
        :stock="stocks"
        @update="findStock"
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
import {getOperations} from "src/store/Stock/stock";
import StockListItem from "components/Stock/StockListItem";
import NoData from "components/Extras/NoData";
import StockOperationList from "components/StockOperation/StockOperationList";
import MyTitle from "components/Extras/MyTitle";
import {date} from "quasar";

export default {
  components: {MyTitle, StockOperationList, NoData, StockListItem},
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
      date_start: date.formatDate(Date.now(), 'DD/MM/YYYY')
    }
  },
  methods: {
    closeCalendar(name) {
      this.$refs[name].hide()
    },
    optionStartFilter(date2) {
      let ts = Date.now();
      let formattedString = date.formatDate(ts, 'YYYY/MM/DD');
      return date2 <= formattedString;
    },
    filterStock() {
      if (!this.stocks_all.length || !this.name) {
        this.stocks = this.stocks_all
        return false
      }
      this.stocks = this.stocks_all.filter(i => i.name.toLowerCase().includes(this.name.toLowerCase()))
    },
    async findStock() {
      const obj = {
        date: this.date_start
      }
      const all = await getOperations(true, obj)
      this.stocks = this.stocks_all = all.data.data
    },


  },
  mounted() {
    this.findStock()
  }
}
</script>
<style lang="sass">
.bt
  border-top: 1px solid $darkless-blue

.q-field__append, .q-field__suffix, .q-field__native, .q-field__input
  color: white

</style>
