<template>
  <div class="row text-white items-center justify-center">

    <div class="col-12">
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Lotes"
        class="full-width"
        :class="number%2 !== 0?'bg-darkless-blue':''"
        dense
      >
        <template v-slot:header>
          <div class="row full-width">
            <div class="col-1 text-center">{{ number }}</div>
            <div class="col">{{ product.name }}</div>
            <div class="col-2 text-center">{{ product.quantity }}</div>
            <div class="col-3">
              <div class="row">
                <stock-add :lite-version="true" :product-new="product" @updated="$emit('updated')"/>
                <stock-substract :lite-version="true" @updated="$emit('updated')"/>
                <product-edit :product-new="product" :lite-version="true" :categories_all="categories"
                              v-if="categories.length  " @updated="$emit('updated')"/>
              </div>
            </div>
          </div>
        </template>
        <q-card>
          <q-card-section class="bg-darkless-blue">
            <q-markup-table dense wrap-cells bordered separator="cell" dark class="full-width">
              <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Fecha de venta</th>
                <th class="text-center">Unidades</th>
                <th class="text-center">Precio/costo</th>
                <th class="text-center">Precio/venta</th>
                <th class="text-center">Creado</th>
                <th class="text-center" v-if="user && user.role_id === 1">
                  Acciones
                </th>
              </tr>
              </thead>
              <tbody>
              <StockItem v-for="(item,index) in product.lotes" :key="item.id" :stock="item" :number="index+1"/>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>
<script>
import StockAdd from "components/Stock/StockAdd";
import StockSubstract from "components/Stock/StockSubstract";
import ProductEdit from "components/Product/ProductEdit";
import StockItem from "components/Stock/StockItem";
import {mapGetters} from "vuex";

export default {
  components: {StockItem, ProductEdit, StockSubstract, StockAdd},
  props: {
    product: {type: Object},
    number: {type: Number},
    categories: {type: Array},
  },
  computed: {
    ...mapGetters({
      user: 'mystore/user'
    })
  },
  data() {
    return {}
  }
}
</script>
