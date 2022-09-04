<template>
  <q-video
    :ratio="ratio"
    :src="fullUrl"

  />
</template>

<script>
export default {
  props: {
    url: {type: String},
    ratio: {type: Number, default: 16/9}
  },
  computed: {
    fullUrl() {
      return process.env.static + this.url
    }
  },
  data() {
    return {}
  }
}
</script>
