<template>
  <div class="row items-center justify-center">
    <div class="col-12 col-sm-6 col-md-4 q-py-xs bg-darkless-blue" v-for="(item,index) in 20" :key="item">
      <ProductItem :index="index"/>
    </div>
  </div>
</template>

<script>
import ProductItem from "components/Product/ProductItem";
import {getProducts} from "src/store/Product/products";

export default {
  components: {ProductItem},
  data() {
    return {
      products: []
    }
  },
  methods: {
    async findProducts() {
      this.$q.loading.show()
      const products = await getProducts();
      this.$q.loading.hide()
      if (products.status < 400) {
        this.products = products.data.data
      } else {
        this.$notify.n('Imposible obtener los productos en estos momentos')
      }
    }
  },
  mounted() {
    this.findProducts()
  }
}
</script>
