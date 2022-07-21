<template>
  <div class="row items-start justify-start ">
    <q-btn no-caps align="left" flat dense text-color="white" color="red" :class="liteVersion?'':'full-width'">
      <q-icon name="mdi-numeric-negative-1" color="red" size="sm"/>
      <span v-if="!liteVersion" class="q-pl-sm">Disminuir stock</span>
    </q-btn>
  </div>
</template>

<script>
export default {
  props: {
    liteVersion: {type: Boolean, default: false}
  },
  data() {
    return {}
  }
}
</script>
