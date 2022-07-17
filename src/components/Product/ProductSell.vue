<template>
  <div>
    <q-btn color="red-5" class="q-px-sm" dense no-caps label="Vender producto"
           @click="selling = true"
           rounded/>
    <q-dialog ref="mymodal" v-model="selling" @before-hide="cleanSearch">
      <div class="row justify-center" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Venta de productos - Paso {{ part }} |</span>
              <span class="text-red" v-if="part === 0"> &nbsp;Seleccione un producto</span>
              <span class="text-red" v-if="part === 1"> &nbsp;Cantidad de unidades a vender</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card v-if="part === 0" square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <div class="row q-gutter-xs custom_css">
                <div class="col-12">
                  <q-select
                    :options="products"
                    options-dense
                    v-model="productReal"
                    :option-label="i => i.name"
                    label-color="white"
                    input-class="text-white"
                    popup-content-class="text-white"
                    options-selected-class="text-white"
                    outlined
                    class="col no-padding"
                    dense
                    use-input
                    clearable
                    @filter="fnProducts"
                    @input="changePart(1)"
                    :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                    label="Seleccione un producto"
                    color="white"
                    :rules="[$rules.required()]"
                    autofocus
                  />
                </div>
                <div class="col-12 text-right q-gutter-xs">
                  <q-btn label="Cancelar" v-close-popup color="dark-blue"/>
                </div>
              </div>
            </q-card-section>

          </q-card>
          <q-card v-if="part === 1" square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <q-form @submit="submit">
                <div class="row q-gutter-xs custom_css">
                  <div class="col-12">
                    <q-card square class="q-mt-sm bg-darkless-blue" flat>
                      <q-card-section class="q-mt-sm">
                        <div class="row q-gutter-xs">
                          <div class="col-12 col-md-3 text-center">
                            <q-btn
                              round
                              size="xl"
                              class="q-pa-md text-white bg-darkless-blue"
                              no-caps
                            >
                              <q-avatar size="8rem" v-if="photo_url">
                                <img :src="photo_url" alt="dsdsd">
                              </q-avatar>
                            </q-btn>
                          </div>
                          <div class="col-12 col-md  text-white">
                            <div class="row items-center">
                              <div class="col-4">
                                Nombre:
                              </div>
                              <div class="col">
                                <q-input
                                  v-model="productReal.name"
                                  label-color="white"
                                  placeholder="Moet Ice Rosé"
                                  color="white"
                                  outlined
                                  input-class="text-white"
                                  dense
                                  :rules="[$rules.required()]"
                                  disable
                                  class="no-padding"
                                />
                              </div>
                            </div>
                            <div class="row items-center justify-center  ">
                              <div class="col-4">
                                Precio Coste:
                              </div>
                              <div class="col">
                                <div class="row justify-center q-mt-md">
                                  <div class="col">
                                    <q-input
                                      v-model="productReal.cost_price"
                                      label-color="white"
                                      placeholder="34.000 XAF"
                                      color="white"
                                      outlined
                                      input-class="text-white"
                                      dense
                                      class="no-padding"
                                      :rules="[$rules.decimal(), $rules.required()]"
                                      disable
                                    />
                                  </div>
                                  <div class="col-4 text-center q-pt-sm"> Precio Venta:</div>
                                  <div class="col">
                                    <q-input
                                      v-model="productReal.sell_price"
                                      label-color="white"
                                      placeholder="44.000 XAF"
                                      color="white"
                                      outlined
                                      input-class="text-white"
                                      dense
                                      disable
                                      :rules="[$rules.decimal(), $rules.required()]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row items-center justify-center">
                              <div class="col-4">
                                Stock disponible:
                              </div>
                              <div class="col q-pr-xs">
                                <div class="row q-pr-sm">
                                  <div class="col">
                                    <q-input
                                      v-model="stock"
                                      label-color="white"
                                      outlined
                                      class="bordered full-width"
                                      dense
                                      input-class="text-white"
                                      :rules="[
                                        $rules.required(),
                                        $rules.decimal(),
                                        $rules.maxValue(productReal.stock),
                                        $rules.minValue(1)
                                        ]"
                                      autofocus
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-5">
                                Dispones de {{ productReal.stock }} unidades máximas
                              </div>
                            </div>
                            <div class="row q-pt-md" v-if="$q.screen.lt.md">
                              <div class="col-12 text-center">
                                <q-btn type="submit" label="Crear producto" no-caps color="red-5" size="md"
                                       rounded class="q-px-lg q-py-xs" dense/>
                              </div>
                            </div>
                          </div>
                          <div class="col-1"></div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-12 text-center q-gutter-xs">
                    <q-btn
                      color="red"
                      rounded
                      no-caps
                      type="submit"
                      label="Confirmar la venta y proceder a control de stock"
                    />
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
import {getProducts, updateStock} from "src/store/Product/products";
import ProductSearchItem from "components/Product/ProductSearchItem";
import {mapGetters} from "vuex";
import CategoryAdd from "components/Category/CategoryAdd";

export default {
  components: {CategoryAdd, ProductSearchItem},
  props: {
    product: {type: Object, default: null},
  },
  computed: {
    photo_url() {
      return process.env.static + this.productReal?.photo || 'logo.png'
    },
    ...mapGetters({
      logged: 'mystore/loggedIn',
      user: 'mystore/user',
    })
  },
  data() {
    return {
      selling: false,
      productReal: [],
      products: [],
      products_all: [],
      waiting: false,
      part: 0,
      stock: 1,
    }
  },
  methods: {
    changePart(parte) {
      this.part = parte
    },
    fnProducts(val, update, abort) {
      update(
        () => {
          if (val === '') {
            this.products = this.products_all
          } else {
            const needle = val.toLowerCase()
            this.products = this.products_all.filter(v => v?.name?.toLowerCase().includes(needle))
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
      this.$emit('updated')
    },
    async submit() {
      const obj = {
        id: this.productReal.id,
        name: this.productReal.name,
        stock: this.stock,
      }
      await updateStock(obj)
      this.part = 0;
      this.stock = 1
      this.productReal = []
      this.$emit('updated')

    },
    async findProducts() {
      const products = await getProducts();
      if (products.status < 400) {
        this.products_all = products.data.data
      }
    }
  },
  mounted() {
    if (!this.product)
      this.findProducts()
    else {
      this.part = 1
      this.productReal = this.product
    }
  }
}
</script>
<style lang="sass">
.custom_css
  .q-field__control
    border: 1px solid white

  .q-virtual-scroll__content, .q-field__append
    color: white
</style>
