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
    lite_mode: {type: Boolean, default: false}
  },
  computed: {
    able() {
      return this.lote.product.tag === 'Todas las unidades'
    }
  },
  data() {
    return {}
  },
  methods: {
    async printTags() {
      const obj = {
        lote_id: this.lote.id,
      }
      const tags = await downloadProductTag(obj)
      console.log(tags)
    }
  }
}
</script>
