<template>
  <tr>
    <td class="col-1 text-center">{{ number }}</td>
    <td class="col">{{ formatterDate(stock.buy_date) }}</td>
    <td class="col text-center">{{ stock.quantity }}</td>
    <td class="col text-center">{{ stock.quantityReal }}</td>
    <td class="col text-center">{{ formatterCurrency(stock.cost_price || 0) }}</td>
    <td class="col text-center">{{ formatterCurrency(stock.sell_price || 0) }}</td>
    <td class="col text-center">{{ formatterDate(stock.created_at) }}</td>
    <td class="col text-center" v-if="user && user.role_id === 1">
      <TagPrint
        class="col-12 borderx"
        :lote="stock"
        :lite_mode="true"
      />
    </td>
  </tr>
</template>

<script>
import {formatCurrency, formatDate} from "src/utils/utils";
import TagPrint from "components/Product/TagPrint";
import {mapGetters} from "vuex";

export default {
  components: {TagPrint},
  props: {
    stock: {type: Object},
    number: {type: Number}
  },
  computed: {
    ...mapGetters({
      user: 'mystore/user'
    })
  },
  data() {
    return {}
  },
  methods: {
    formatterDate(item) {
      return formatDate(item)
    },
    formatterCurrency(item) {
      return formatCurrency(item)
    }
  }
}
</script>
