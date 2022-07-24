<template>
  <div class="row items-start justify-start full-width">
    <q-btn no-caps :align="lite_mode?'center':'left'" flat dense text-color="white" color="red" class="full-width" @click="printTags" >
      <q-icon name="mdi-printer" color="red" size="sm"/>
      <span class="q-pl-sm" v-if="!lite_mode">Imprimir etiqueta</span>
    </q-btn>
  </div>
</template>

<script>
import {downloadProductTag} from "src/store/Product/products";

export default {
  // name: 'ComponentName',
  props:{
    lote:{type:Object},
    lite_mode:{type:Boolean, default:false}
  },
  data () {
    return {}
  },
  methods:{
    printTags(){
      const obj = {
        lote_id:this.lote.id,
      }
      const tags = downloadProductTag(obj)
    }
  }
}
</script>
