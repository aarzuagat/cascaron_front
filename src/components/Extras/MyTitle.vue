<template>
  <div class="q-pa-sm">
    <p v-if="lite_version" :class="`text-${align} bb text-white`">{{ title }}</p>
    <p v-else :class="`text-h5 text-${align} bb text-white`">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String},
    lite_version: {type: Boolean, default:false},
    align: {type: String, default:'right'},
  },
  data() {
    return {}
  }
}
</script>
<style lang="sass">
.bb
  border-bottom: 1px solid white
</style>
