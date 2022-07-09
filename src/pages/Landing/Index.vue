<template>
  <q-page >
    <div class="row q-pa-lg">
      <div class="col-12 bg-dark-blue q-py-sm  q-mr-lg">
        <div class="row items-center">
          <div class="col-4 q-pl-sm text-red text-bold">Listado de productos</div>
          <div class="col text-right q-mr-sm q-gutter-x-xs">
            <div class="row items-center q-gutter-xs justify-end">
              <ProductAdd/>
              <q-btn color="red-5" class="q-px-sm" dense no-caps label="Vender producto" rounded/>
              <q-btn color="red-5" class="q-px-sm" dense no-caps label="Buscar   producto" rounded/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 q-mt-sm bg-dark-blue">
        <ProductList/>
      </div>
    </div>
  </q-page>
</template>

<script>
import ProductList from "components/Product/ProductList";
import ProductAdd from "components/Product/ProductAdd";

export default {
  name: 'PageIndex',
  components: {ProductAdd, ProductList}
}
</script>
