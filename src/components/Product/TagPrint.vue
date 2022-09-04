<template>
  <div class="row " :class="lite_mode?'':'full-width'">
    <q-btn v-if="able" no-caps :align="lite_mode?'center':'left'" flat dense text-color="white" color="red"
           :class="lite_mode?'':'full-width'" @click="printTags">
      <q-icon name="mdi-printer" color="red" size="sm"/>
      <span class="q-pl-sm" v-if="!lite_mode">Imprimir etiqueta</span>
      <q-tooltip>Impresión de etiquetas</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import {downloadProductTag} from "src/store/Product/products";

export default {
  // name: 'ComponentName',
  props: {
    lote: {type: Object},
    product: {type: Object, default: null},
    lite_mode: {type: Boolean, default: false},
    product_mode: {type: Boolean, default: false}
  },
  computed: {
    able() {
      if (this.product_mode){
        return this.product.tag === 'Todas las unidades'
      }
      return this.lote.product.tag === 'Todas las unidades'
    }
  },
  data() {
    return {}
  },
  methods: {
    async printTags() {
      let obj = {}
      if (!this.product_mode) {
        obj = {
          lote_id: this.lote.id,
        }
      }
      if (this.product_mode && this.product !== null) {
        obj.product_id = this.product.id
      }
      const tags = await downloadProductTag(obj)
      console.log(tags)
    }
  }
}
</script>
