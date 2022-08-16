<template>
  <div>
    <q-btn v-if="sign_mode" dense no-caps @click="selling = true" flat text-color="white" color="red"
           align="left">
      <q-icon name="fa fa-dollar-sign" color="red" size="sm"/>
      <q-tooltip>Venta de producto</q-tooltip>
    </q-btn>
    <q-btn class="full-width" v-else-if="menu_mode" dense no-caps @click="selling = true" flat text-color="white"
           color="red"
           align="left">
      <q-icon name="fa fa-dollar-sign" color="white" size="sm"/>
      <span class="q-pl-sm">Vender producto</span>
    </q-btn>
    <q-btn class="full-width" v-else-if="lite_mode" dense no-caps @click="selling = true" flat text-color="white"
           color="red"
           align="left">
      <q-icon name="fa fa-dollar-sign" color="red" size="sm"/>
      <span class="q-pl-sm">Nueva venta</span>
    </q-btn>
    <q-btn color="red-5" class="q-px-sm" dense no-caps v-else label="Vender producto"
           @click="selling = true" rounded/>

    <q-dialog ref="mymodal" v-model="selling"
              @before-hide="cleanSearch"
              @before-show="loadValues"
    >
      <div class="row justify-center" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <div class="row">
                <span class="text-red" :class="$q.screen.lt.sm?'col-12':''">Venta de productos - Paso
                  {{ part }} |</span>
                <span class="text-red" :class="$q.screen.lt.sm?'col-12':''" v-if="part === 0"> &nbsp;Seleccione un producto</span>
                <span class="text-red" :class="$q.screen.lt.sm?'col-12':''" v-if="part === 1"> &nbsp;Cantidad de unidades a vender</span>
                <span class="text-red" :class="$q.screen.lt.sm?'col-12':''" v-if="part === 2"> &nbsp;Marcar qué productos salen del stock</span>
              </div>
              <q-space/>
              <q-btn flat round dense color="info" icon="mdi-keyboard-backspace" :disable="part === 0"
                     @click="part = part-1"/>
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
                    :options="products_filtered"
                    options-dense
                    v-model="productSelect"
                    :option-label="i => i.name"
                    label-color="white"
                    input-class="text-white"
                    popup-content-class="text-white"
                    options-selected-class="text-white"
                    outlined
                    :loading="products_all.length ===0 && !product"
                    :disable="products_all.length ===0"
                    class="col no-padding"
                    @filter="filterProducts"
                    dense
                    @input="setInitial"
                    use-input
                    clearable
                    @clear="tag = ''"
                    @remove="tag = ''"
                    :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                    label="Seleccione un producto"
                    color="white"
                    :rules="[$rules.required()]"
                    autofocus
                  />
                </div>
                <div class="col-12">
                  <q-select
                    :options="tagOptions"
                    options-dense
                    v-model="tag"
                    :option-label="i => i.tag"
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
                    @input="changePart"
                    @clear="tag = ''"
                    @remove="tag = ''"
                    :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                    label="Seleccione una etiqueta"
                    color="white"
                    :rules="[$rules.required()]"
                    autofocus
                    :disable="productSelect === ''"
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
              <q-form @submit="secondPart">
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
                                        $rules.maxValue(realQuantity),
                                        $rules.minValue(1)
                                        ]"
                                      autofocus
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-5">
                                Dispones de {{ realQuantity }} unidades máximas
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
z          </q-card>
          <q-card v-if="part === 2" square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <q-form @submit="submit">
                <div class="row q-gutter-xs custom_css">
                  <div class="col-12" v-for="item in sell" :key="item.id">
                    <q-card square class="bg-darkless-blue" flat>
                      <q-card-section>
                        <div class="row q-gutter-xs">
                          <div class="col-12 col-md text-center">
                            <q-btn
                              round
                              size="md"
                              class="q-pa-md text-white bg-darkless-blue"
                              no-caps
                              disable
                            >
                              <q-avatar size="6rem" v-if="photo_url">
                                <img :src="photo_url" alt="dsdsd">
                              </q-avatar>
                            </q-btn>
                          </div>
                          <div class="col-12 col-md-9 text-white" :class="$q.screen.lt.sm?'text-center':''">
                            <div class="row q-pa-sm items-center justify-center ">
                              <div class="col-12 col-md-3">
                                Nombre:
                              </div>
                              <div class="col-12 col-md text-white">
                                <q-input
                                  v-model="item.name"
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
                            <div class="row q-pa-sm items-center justify-center">
                              <div class="col-12 col-md-3">
                                Código de Barras:
                              </div>
                              <div class="col-12 col-md text-white">

                                <q-select
                                  :options="tagOptions"
                                  options-dense
                                  v-model="item.code"
                                  :option-label="i => i.tag"
                                  label-color="white"
                                  input-class="text-white"
                                  popup-content-class="text-white"
                                  options-selected-class="text-white"
                                  outlined
                                  class="col no-padding"
                                  dense
                                  use-input
                                  clearable
                                  @filter="fnTagByroducts"
                                  :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                                  label="Seleccione un producto"
                                  color="white"
                                  :rules="[$rules.required()]"
                                  autofocus
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-separator color="white" class="q-mx-lg" size="1px" v-if="item.id < sell.length-1"/>
                  </div>
                  <div class="col-12 text-center q-gutter-xs">
                    <q-btn
                      color="red"
                      rounded
                      no-caps
                      type="submit"
                      label="Confirmar la venta y reducir el stock"
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
import {destructurateObject} from "src/utils/utils";

export default {
  components: {CategoryAdd, ProductSearchItem},
  props: {
    lite_mode: {type: Boolean, default: false},
    menu_mode: {type: Boolean, default: false},
    sign_mode: {type: Boolean, default: false},
    product: {type: Object, default: null},
    lote: {type: Object, default: null},
    products: {type: Array, default: null},
    tags: {type: Array, default: null},
  },
  computed: {
    photo_url() {
      return process.env.static + this.productReal?.photo || 'logo.png'
    },
    realQuantity() {
      if (this.loteReal) {
        return this.loteReal.quantityStock
      }
      return this.productReal?.quantity ?? 0
    },
    tagOptions() {
      if (this.productSelect) {
        let lotes = this.productSelect.lotes.map(i => i.id)
        const taken = this.sell.map(i => i.code.id).flat(1)
        const filterByProduct = i => lotes.includes(i.lote_id)
        const filterTaken = i => !taken.includes(i.id)
        this.tags_filtered = this.tags_all = this.productSelect.lotes.flat(1).map(i => i.tags).flat(1)
        return this.tags_all.filter(filterByProduct).filter(filterTaken) ?? []
      }
      return []
    },
    ...mapGetters({
      logged: 'mystore/loggedIn',
      user: 'mystore/user',
    })
  },
  data() {
    return {
      selling: false,
      productReal: {
        id: 0,
        photo: null,
        sell_price: 0,
        cost_price: 0,
        quantity: 0,
        name: '',
        tag: '',
        lotes: [],
        lite: false
      },
      productSelect: '',
      waiting: false,
      part: 0,
      stock: 1,
      products_all: [],   //all
      products_filtered: [],  //filtered
      tags_all: [],   //all
      tags_filtered: [],   //all
      tag: [],   //all
      sell: [],
      loteReal: null,
    }
  },
  methods: {
    setInitial() {
      if (this.productSelect.tag !== 'Todas las unidades') {
        if (!this.product){
          this.productReal = this.productSelect
          this.tags_filtered = this.tags_all = this.productReal.lotes.flat(1).map(i => i.tags).flat(1)
        }
        this.destructure(this.productSelect)
        this.part = 1
      }


    },
    changePart() {
      const producto = this.productSelect
      const lote = this.productSelect.lotes?.filter(i => i.id === this.tag.lote_id)[0]
      this.productReal = destructurateObject(this.productReal, producto)
      this.destructure(producto)
      if (lote) {
        this.productReal.cost_price = lote.cost_price
        this.productReal.sell_price = lote.sell_price
        this.productReal.quantity = lote.tags.filter(i => !i.deleted_at).length
      }
      this.part = 1
    },
    destructure(producto) {
      this.productReal.lotes = producto.lotes
      this.productReal.photo = producto.photo
      this.productReal.name = producto.name
      this.productReal.tag = producto.tag
    },
    secondPart() {
      if (this.productReal.tag !== 'Todas las unidades') {
        this.productReal.lite = true
        this.submit()
      } else {
        const lista = [...Array(parseInt(this.stock)).keys()]
        this.sell = []
        lista.forEach(i => {
          const item = {
            id: i,
            name: this.productReal.name,
            code: ''
          }
          this.sell.push(item)
        })
        this.part = 2
      }
    },
    filterProducts(val, update, abort) {
      update(
        () => {
          if (val === '') {
            this.products_filtered = this.products_all
          } else {
            const needle = val.toLowerCase()
            this.products_filtered = this.products_all.filter(v => v?.name?.toLowerCase().includes(needle))
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
    fnProducts(val, update, abort) {
      update(
        () => {
          if (val === '') {
            this.products_filtered = this.products_all
          } else {
            const needle = val.toLowerCase()
            this.products_filtered = this.products_all.filter(v => v?.name?.toLowerCase().includes(needle))
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
    fnTagByroducts(val, update, abort) {
      const lotes = this.productReal.lotes.map(i => i.id)
      const taken = this.sell.map(i => i.code.id).flat(1)
      const filterByProduct = i => lotes.includes(i.lote_id)
      const filterTaken = i => !taken.includes(i.id)
      update(
        () => {
          if (val === '') {
            this.tags_filtered = this.tags_all.filter(filterByProduct)
          } else {
            const needle = val.toLowerCase()
            this.tags_filtered = this.tags_all.filter(filterByProduct).filter(filterTaken).filter(v => v?.tag?.toLowerCase().includes(needle))
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
      this.part = 0;
      this.productSelect = ''
      // this.productReal = {
      //   id: 0,
      //   photo: null,
      //   sell_price: 0,
      //   cost_price: 0,
      //   quantity: 0,
      //   name: '',
      //   tag: '',
      //   lotes: [],
      //   lite: false
      // }
      this.$emit('updated')
    },
    async submit() {
      const obj = {
        product: this.productReal,
        sell: this.sell,
        name: this.productReal.name,
        quantity: this.stock,
        lote: this.loteReal ?? null
      }
      console.log(obj)
      await updateStock(obj)
      this.part = 0;
      this.selling = false
      this.tag = ''
      this.products_filtered = this.products_all = []
      this.tags_filtered = this.tags_all = []
      this.$emit('updated')
    },
    async findProducts(show_loading = true) {
      this.products_filtered = this.products_all = []
      const products = await getProducts(show_loading);
      if (products.status < 400) {
        const all = products.data.data
        this.products_filtered = this.products_all = all
        if (this.product) {
          if (this.product.tag !== 'Sin etiqueta')
            this.tags_filtered = this.tags_all = all.map(i => i.lotes).flat(1).map(i => i.tags).flat(1)
          this.setItems()
        }
      }
    },
    /**
     * @param {Object} producto
     * @param {Array} lotes
     */
    setItems(producto, lotes = null) {
      this.productSelect = producto
      this.productReal = destructurateObject(this.productReal, producto)
      if (lotes) {
        this.productReal.lotes = this.productSelect.lotes = lotes
        this.tags_filtered = this.tags_all = lotes.map(i => i.tags).flat(1)
      } else {
        this.productReal.lotes = producto.lotes
        this.tags_filtered = this.tags_all = this.productReal.lotes.flat(1).map(i => i.tags).flat(1)
        console.log(this.productReal.lotes.map(i => i.tags).flat(1))
      }
      this.productReal.photo = producto.photo
      this.productReal.name = producto.name
      this.productReal.tag = producto.tag
      if (lotes?.length === 1) {
        this.productReal.cost_price = lotes[0].cost_price
        this.productReal.sell_price = lotes[0].sell_price
      }
    },
    // loreini
    loadValues() {
      if (this.lote) {
        this.loteReal = this.lote
        const product = this.loteReal.product
        // this.productReal = destructurateObject(this.productReal,this.loteReal)
        this.setItems(product, [this.lote])
        this.part = 1
      } else if (this.product) {
        console.log('estoy en producto')
        this.productSelect = this.productReal = this.product
        this.setItems(this.product)
        if (this.product.tag === 'Sin etiqueta') {
          this.part = 1
        }
      } else {
        this.findProducts()
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="sass">
.custom_css
  .q-field__control
    border: 1px solid white

  .q-virtual-scroll__content, .q-field__append, .q-field__native
    color: white
</style>
