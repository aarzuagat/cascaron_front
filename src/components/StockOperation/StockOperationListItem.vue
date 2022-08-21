<template>
  <div class="row text-center justify-center items-center">
    <div class="col-12 q-py-md" v-if="lite">
      <div class="row text-left">
        Fecha de compra: {{ $formatterDate(operation.created_at) }}
        <br>Nombre: {{ operation.lote.product.name }}
        <br>Precio de venta: {{ $formatterCurrency(operation.lote.sell_price) }}
        <br>Cantidades vendidas: {{ operation.quantity }}
      </div>
    </div>
    <div class="col-12" v-else>
      <div class="row">
        <div class="col-1">
          {{ index }}
        </div>
        <div class="col">
          {{ $formatterDateTime(operation.created_at) }}
        </div>
        <div class="col">
          {{ operation.lote.product.name }}
        </div>
        <div class="col text-right">
          {{ $formatterCurrency(operation.lote.sell_price) }}
        </div>
        <div class="col text-center">
          {{ operation.quantity }}
        </div>
        <div class="col " v-if="!lite">
          <div class="row items-center flex-center">
            <StockOperationCancel :operation="operation" @update="$emit('update')"/>
            <StockOperationChange :operation="operation" @update="$emit('update')"/>
          </div>
        </div>
      </div>
    </div>


    <div class="col-12" v-if="!lite">
      <q-separator color="white" class="full-width"/>
    </div>
  </div>
</template>

<script>
import StockOperationCancel from "components/StockOperation/StockOperationCancel";
import StockOperationChange from "components/StockOperation/StockOperationChange";

export default {
  name: "StockOperationListItem",
  components: {StockOperationChange, StockOperationCancel},
  props: {
    operation: {type: Object},
    index: {type: Number},
    lite: {type: Boolean, default: false},
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
