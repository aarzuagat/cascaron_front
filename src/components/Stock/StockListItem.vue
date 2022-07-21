<template>
  <div class="row text-white">
    <div class="col-1 text-center">{{ number }}</div>
    <div class="col">{{ product.name }}</div>
    <div class="col-2 text-center">{{ product.quantity }}</div>
    <div class="col-3">
      <div class="row">
        <stock-add :lite-version="true"/>
        <stock-substract :lite-version="true"/>
      </div>
    </div>
  </div>
</template>
<script>
import StockAdd from "components/Stock/StockAdd";
import StockSubstract from "components/Stock/StockSubstract";

export default {
  components: {StockSubstract, StockAdd},
  props: {
    product: {type: Object},
    number: {type: Number}
  },
  data() {
    return {}
  }
}
</script>
