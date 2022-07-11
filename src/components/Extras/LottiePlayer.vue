<template>
  <VueLottiePlayer
    :name="name"
    loop
    :path="path"
  />
</template>

<script>
import VueLottiePlayer from "vue-lottie-player";

export default {
  // name: 'ComponentName',
  components: {
    VueLottiePlayer
  },
  props: {
    path: {type: String},
    name: {type: [String,Number], default:'image'+Math.random()},
  },
  data() {
    return {}
  }
}
</script>
