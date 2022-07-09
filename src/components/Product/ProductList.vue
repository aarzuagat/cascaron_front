<template>
  <div class="row items-center justify-center">
    <div class="col-12 col-sm-6 col-md-4 q-py-xs bg-darkless-blue" v-for="(item,index) in 20" :key="item">
      <ProductItem :index="index" />
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
