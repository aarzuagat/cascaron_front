<template>
  <div class="row">
    <div class="col-12 flex-center flex">
      <LottiePlayer
        path="https://assets2.lottiefiles.com/private_files/lf30_e3pteeho.json"
      />
    </div>
    <div class="col-12 text-center">
      <h5 class="text-white">No hay elementos para mostrar</h5>
    </div>
  </div>
</template>

<script>
import LottiePlayer from "components/Extras/LottiePlayer";

export default {
  components: {LottiePlayer},
  // name: 'ComponentName',
  data() {
    return {}
  }
}
</script>
