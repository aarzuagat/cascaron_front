<template>
  <div>
    <q-btn class="full-width" v-if="menu_mode" dense no-caps @click="searching = true" flat text-color="white" color="red"
           align="left">
      <q-icon name="mdi-file-search" color="white" size="sm"/>
      <span class="q-pl-sm">Buscar producto</span>
    </q-btn>
    <q-btn color="red-5"  class="q-px-sm" dense no-caps label="Buscar producto"
           @click="searching = true"
           v-if="products_all.length && !menu_mode"
           rounded/>
    <q-dialog ref="mymodal" v-model="searching" @before-hide="cleanSearch">
      <div class="row justify-center" style="max-width: 65vw; width: 60vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Buscar producto</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <q-form @submit="submit">
                <div class="row q-gutter-xs custom_css">
                  <div class="col-12">
                    <div class="row q-gutter-sm">
                      <q-input
                        class="col no-padding"
                        v-model="product.name"
                        label="El nombre contiene..."
                        dense
                        label-color="white"
                        input-class="text-white"
                        @input="submit"
                        debounce="500"
                        :loading="waiting"
                        autofocus
                      />
                      <q-select
                        :options="categories"
                        options-dense
                        v-model="product.category_id"
                        :option-label="i => i.name"
                        label-color="white"
                        input-class="text-white"
                        popup-content-class="text-white"
                        outlined
                        class="col no-padding"
                        dense
                        use-input
                        clearable
                        multiple
                        @filter="fnCategories"
                        @input="submit"
                        :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                        label="Seleccione una categoría"
                        color="white"
                        :rules="[$rules.required()]"
                      >
                        <template v-slot:no-option v-if="user && user.role_id === 1">
                          <q-item>
                            <q-item-section class="text-grey">
                              <CategoryAdd class="full-width" :full-width="true" @newCategory="$emit('updated')"/>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row q-gutter-sm">
                      <q-input
                        class="col"
                        v-model="product.cost_price_min"
                        label="Precio de venta costo"
                        dense
                        label-color="white"
                        input-class="text-white"
                        @input="submit"
                        debounce="500"
                        :loading="waiting"
                        autofocus
                      />
                      <q-input
                        class="col"
                        v-model="product.cost_price_max"
                        label="Precio de costo máximo"
                        dense
                        label-color="white"
                        input-class="text-white"
                        @input="submit"
                        debounce="500"
                        :loading="waiting"
                        autofocus
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row q-gutter-sm">
                      <q-input
                        class="col"
                        v-model="product.sell_price_min"
                        label="Precio de venta mínimo"
                        dense
                        label-color="white"
                        input-class="text-white"
                        @input="submit"
                        debounce="500"
                        :loading="waiting"
                        autofocus
                      />
                      <q-input
                        class="col"
                        v-model="product.sell_price_max"
                        label="Precio de venta máximo"
                        dense
                        label-color="white"
                        input-class="text-white"
                        @input="submit"
                        debounce="500"
                        :loading="waiting"
                        autofocus
                      />
                    </div>
                  </div>
                  <div class="col-12 text-right q-gutter-xs">
                    <q-btn label="Cancelar" v-close-popup color="dark-blue"/>
                  </div>
                  <div class="col-12 q-py-xs text-white" v-if="products.length">
                    <div class="row bg-dark-blue">
                      <div class="col text-left">Nombre</div>
                      <div class="col text-center">Precio de venta</div>
                      <div class="col text-center">Precio de costo</div>
                      <div class="col text-left">Categoría</div>
                      <div class="col-1 text-center" v-if="logged">Acciones</div>
                    </div>
                  </div>
                  <div class="col-12 text-white">
                    <ProductSearchItem @updated="$emit('updated'); searching = false" v-for="item in products"
                                       :key="item.id" :product="item"/>
                  </div>

                </div>
              </q-form>
            </q-card-section>

          </q-card>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import {getProducts} from "src/store/Product/products";
import ProductSearchItem from "components/Product/ProductSearchItem";
import {mapGetters} from "vuex";
import CategoryAdd from "components/Category/CategoryAdd";

export default {
  components: {CategoryAdd, ProductSearchItem},
  props: {
    categories: {type: Array},
    menu_mode: {type: Boolean, default:false},
  },
  computed: {
    ...mapGetters({
      logged: 'mystore/loggedIn',
      user: 'mystore/user',
    })
  },
  data() {
    return {
      searching: false,
      product: {
        name: '',
        cost_price_min: '',
        cost_price_max: '',
        sell_price_min: '',
        sell_price_max: '',
        category_id: [],
        description: '',
        stock: '',
        tag: ''
      },
      tags: [
        'Todas las unidades',
        'Sin etiqueta',
      ],
      products: [],
      products_all: [],
      categoriesFiltered: [],
      waiting: false
    }
  },
  methods: {
    fnCategories(val, update, abort) {
      update(
        () => {
          if (val === '') {
            this.categoriesFiltered = this.categories
          } else {
            const needle = val.toLowerCase()
            this.categoriesFiltered = this.categories.filter(v => v?.name?.toLowerCase().includes(needle))
          }
        },
        ref => {
          if (val !== '' && ref.options.length > 0) {
            ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
          }
        }
      )
    },
    cleanSearch() {
      this.product = {
        name: '',
        cost_price_min: '',
        cost_price_max: '',
        sell_price_min: '',
        sell_price_max: '',
        category_id: null,
        description: '',
        stock: '',
        tag: ''

      }
    },
    submit: function () {
      this.waiting = true
      let all = this.products_all;
      if (this.product.name) {
        all = all.filter(i => i.name.toLowerCase().includes(this.product.name.toLowerCase()))
      }
      if (this.product.category_id) {
        all = all.filter(i => this.product.category_id.map(i => i.id).includes(i.category_id))
        console.log(all.map(i => i.category_id))
      }
      if (this.product.sell_price_min) {
        all = all.filter(i => i.sell_price >= this.product.sell_price_min)
      }
      if (this.product.sell_price_max) {
        all = all.filter(i => i.sell_price <= this.product.sell_price_max)
      }
      if (this.product.cost_price_min) {
        all = all.filter(i => i.sell_price >= this.product.sell_price_min)
      }
      if (this.product.cost_price_max) {
        all = all.filter(i => i.sell_price <= this.product.sell_price_max)
      }
      this.products = all
      this.waiting = false
    },
    async findProducts() {
      const products = await getProducts(false);
      if (products.status < 400) {
        this.products_all = products.data.data
      }
    }
  },
  mounted() {
    this.findProducts()
    this.categoriesFiltered = this.categories
  }
}
</script>
<style lang="sass">
.custom_css
  .q-field__control
    border: 1px solid white

  .q-virtual-scroll__content
    color: white
</style>
