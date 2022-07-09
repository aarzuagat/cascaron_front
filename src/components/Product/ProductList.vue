<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 q-py-xs bg-darkless-blue" v-for="item in 20" :key="item">
      <ProductItem class="q-mx-xs" />
    </div>
  </div>
</template>

<script>
import ProductItem from "components/Product/ProductItem";

export default {
  components: {ProductItem},
  // name: 'ComponentName',
  data() {
    return {}
  }
}
</script>
