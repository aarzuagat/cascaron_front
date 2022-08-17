<template>
  <div class="q-pa-sm">
    <p class="text-h5 text-right bb text-white">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String}
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
