<template>
  <tr>
    <td class="col-1 text-center">{{ number }}</td>
    <td class="col">{{ formatterDate(stock.buy_date) }}</td>
    <td class="col text-center">{{ stock.quantityStock }}</td>
    <td class="col text-center">{{ stock.quantityReal }}</td>
    <td class="col text-center">{{ formatterCurrency(stock.cost_price || 0) }}</td>
    <td class="col text-center">{{ formatterCurrency(stock.sell_price || 0) }}</td>
    <td class="col text-center">{{ formatterDate(stock.created_at) }}</td>
    <td class="col text-center" v-if="user && user.role_id === 1">
      <div class="row items-center justify-center">
        <TagPrint
          :lote="stock"
          :lite_mode="true"
        />
        <ProductSellC
          :product="product"
          @updated="$emit('updated')"
          :products="products"
          :tags="tags"
          :lote="stock"
          v-if="stock"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import {formatCurrency, formatDate} from "src/utils/utils";
import TagPrint from "components/Product/TagPrint";
import {mapGetters} from "vuex";
import ProductSellC from "components/Sell/ProductSellC";

export default {
  components: {ProductSellC,  TagPrint},
  props: {
    stock: {type: Object},
    number: {type: Number},
    product:{type:Object,default:null},
    tags:{type:Array,default:null},
    products:{type:Array,default:null},
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
