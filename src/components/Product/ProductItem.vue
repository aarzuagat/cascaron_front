<template>
  <div class="row " :class="isInIndex?'q-mx-sm':''">
    <div class="col-12">
      <q-card flat bordered class="my-card bg-dark-blue" square>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col text-center">
              <q-avatar size="5rem">
                <img :src="image"/>
              </q-avatar>
            </div>
            <div class="col">
              <span class="text-white">{{ product.name }}</span>
              <br><span class="text-white">{{ product.description.slice(0, 10) || '-' }}</span>
              <br><span class="text-red text-bold q-mt-md">{{ formatterCurrency(product.sell_price) }}</span>
            </div>
            <div class="col-auto">
              <q-btn color="white" round flat class="absolute-top-right" icon="more_vert" v-if="logged">
                <q-popup-proxy transition-show="flip-up" transition-hide="flip-down" breakpoint="400">
                  <div class="row bg-dark-blue borderx" style="border: 2px solid red; width: 20vw">
                    <TagPrint v-if="user && user.role_id === 1" class="col-12 borderx"/>
                    <ProductEdit
                      v-if="user && user.role_id === 1"
                      class="col-12 borderx"
                      :product-new="product"
                      @updated="$emit('updated')"
                    />
                    <ProductDelete
                      v-if="user && user.role_id === 1"
                      class="col-12 borderx"
                      :product-new="product"
                      @updated="$emit('updated')"
                    />
                    <sell-add v-if="user && user.role_id === 2" class="col-12 borderx"/>
                    <StockAdd v-if="user && user.role_id === 1" class="col-12 borderx"/>
                  </div>
                </q-popup-proxy>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {formatCurrency} from "src/utils/utils";
import StockAdd from "components/Stock/StockAdd";
import SellAdd from "components/Sell/SellAdd";
import ProductEdit from "components/Product/ProductEdit";
import TagPrint from "components/Product/TagPrint";
import {mapGetters} from "vuex";
import ProductDelete from "components/Product/ProductDelete";

export default {
  components: {ProductDelete, TagPrint, ProductEdit, SellAdd, StockAdd},
  // name: 'ComponentName',
  props: {
    index: {type: Number},
    product: {type: Object},
  },
  computed: {
    image() {
      if (this.product.photo)
        return process.env.static + this.product.photo
      return '/img/image.jpg'
    },
    isInIndex() {
      const candidates = [...Array(50).keys()].map((elem, index) => 1 + (3 * index))
      return candidates.includes(this.index)
    },
    ...mapGetters({
      logged: 'mystore/loggedIn',
      user: 'mystore/user'
    })
  },
  data() {
    return {}
  },
  methods: {

    formatterCurrency(amount) {
      return formatCurrency(amount)
    }
  },

}
</script>
<style lang="sass">
.borderx
  border-bottom: 1px solid red
</style>
