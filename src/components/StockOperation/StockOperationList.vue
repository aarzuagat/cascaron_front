<template>
  <div class="row">

    <div class="col-12 q-py-md" v-if="!lite">
      <div class="row text-center">
        <div class="col-1">No.</div>
        <div class="col">Fecha de compra</div>
        <div class="col">Nombre</div>
        <div class="col text-right">Precio de venta</div>
        <div class="col">Cantidades vendidas</div>
        <div class="col">Acciones</div>
      </div>
    </div>
    <div class="col-12" >
      <StockOperationListItem
        v-for="(item,index) in stock"
        :key="index"
        :operation="item"
        :index="index+1"
        :lite="lite"
        @update="$emit('update')"
      />
    </div>
  </div>
</template>

<script>
import StockOperationListItem from "components/StockOperation/StockOperationListItem";

export default {
  name: "StockOperationList",
  components: {StockOperationListItem},
  props: {
    stock: {type: Array},
    lite: {type: Boolean, default: false},
  },
  data() {
    return {}
  }
}
</script>
