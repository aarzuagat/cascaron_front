<template>
  <q-page>
    <div class="row q-pa-lg">
      <div class="col-12 bg-dark-blue q-py-sm  q-mr-lg">
        <div class="row items-center">
          <div class="col-4 q-pl-sm text-red text-bold">Listado de productos</div>
          <div class="col text-right q-mr-sm q-gutter-x-xs">
            <div class="row items-center q-gutter-xs justify-end">
              <ProductAdd v-if="loggedin && user?.role_id < 3" @updated="updateList"/>
              <q-btn v-if="loggedin && user?.role_id < 3" color="red-5" class="q-px-sm" dense no-caps label="Vender producto" rounded/>
              <q-btn v-if="loggedin && user?.role_id < 3" color="red-5" class="q-px-sm" dense no-caps label="Buscar   producto" rounded/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 q-mt-sm" :key="getKey">
        <ProductList />
      </div>
    </div>
  </q-page>
</template>

<script>
import ProductList from "components/Product/ProductList";
import ProductAdd from "components/Product/ProductAdd";
import {mapGetters} from "vuex";

export default {
  name: 'PageIndex',
  components: { ProductAdd, ProductList},
  computed: {
    getKey(){
      return this.key
    },
    ...mapGetters({
      user: 'mystore/user',
      loggedin: 'mystore/loggedIn',
    })
  },
  data() {
    return{
      key:0
    }
  },
  methods:{
    updateList(){
      this.key++
    }
  }
}
</script>
