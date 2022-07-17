<template>
  <div class="row " :class="products.length < 3?'':'items-center justify-center'">
    <div v-if="!products.length" class="col-12">
      <NoData/>
    </div>
    <div v-else class="col-12 col-sm-6 col-md-4 q-py-xs bg-darkless-blue" v-for="(item,index) in products"
         :key="item.id">
      <ProductItem :categories_all="categories_all" :index="index" :product="item" @updated="findProducts"/>
    </div>
  </div>
</template>

<script>
import ProductItem from "components/Product/ProductItem";
import {getProducts} from "src/store/Product/products";
import NoData from "components/Extras/NoData";

export default {
  components: {NoData, ProductItem},
  props:{
    categories_all: {type:Array},
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    async findProducts() {
      const products = await getProducts();
      if (products.status < 400) {
        this.products = products.data.data
      }
    }
  },
  mounted() {
    this.findProducts()
  }
}
</script>
