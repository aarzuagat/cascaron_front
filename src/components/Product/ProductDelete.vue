<template>
  <div class="row items-start justify-start full-width">
    <q-btn no-caps align="left" :class="liteVersion?'':`full-width`" flat dense text-color="white" color="red"
           @click="showing = true">
      <template v-slot:default>
        <q-icon name="mdi-trash-can" color="red" size="sm"/>
        <span class="q-pl-sm" v-if="!liteVersion">Eliminar producto</span>
      </template>
    </q-btn>
    <q-dialog ref="mymodal" v-model="showing">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Eliminar producto</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <q-form @submit="submit">
                <div class="row q-gutter-xs text-white">
                  <div class="col-12">¿Seguro que desea eliminar el producto con nombre "{{ product.name }}"?</div>
                  <div class="col-12 text-right q-gutter-xs">
                    <q-btn label="Cancelar" v-close-popup color="darkless-blue"/>
                    <q-btn label="Eliminar" color="dark" type="submit"/>
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
import {destructurateObject, objectToFormData} from "src/utils/utils";
import {deleteProduct, putProduct} from "src/store/Product/products";
import {getCategories} from "src/store/Category/categories";
import CategoryAdd from "components/Category/CategoryAdd";
import FormCardAction from "components/Extras/FormCardActions";

export default {
  components: {FormCardAction, CategoryAdd},
  props: {
    productNew: {type: Object},
    categories_all:{type:Array},
    liteVersion: {type: Boolean, default: false},
  },
  data() {
    return {
      showing: false,
      product: {
        id: null,
        name: '',
        photo: [],
        cost_price: '',
        sell_price: '',
        category_id: null,
        description: '',
        stock: '',
        tag: null,
      },
      tags: [
        'Todas las unidades',
        'Sin etiqueta',
      ],
      photo_url: null,
      categories: [],
    }
  },
  methods: {
    async submit() {
      const newProduct = await deleteProduct(this.product)
      this.showing = false;
      this.$emit('updated')
    },
    setItems() {
      this.product = destructurateObject(this.product, this.productNew)
      this.photo_url = process.env.static + this.product.photo
      this.product.photo = []
    },
    fnCategories(val, update, abort) {
      update(
        () => {
          if (val === '') {
            this.categories = this.categories_all
          } else {
            const needle = val.toLowerCase()
            this.categories = this.categories_all.filter(v => v?.name?.toLowerCase().includes(needle))
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
    async findCategories(showLoading) {
      this.categories = this.categories_all = await getCategories(showLoading);
    },
    urlImage() {
      this.photo_url = URL.createObjectURL(this.product.photo)
    },
    addCategory(newCategory) {
      this.categories_all.push(newCategory)
      this.product.category_id = newCategory
    },
    cleanProduct() {
      this.product = {
        name: '',
        photo: [],
        cost_price: '',
        sell_price: '',
        category_id: null,
        description: '',
        stock: '',
        tag: 'Sin etiqueta',
      }
      this.photo_url = ''
    },
  },
  mounted() {
    this.setItems()
  }
}
</script>
<style lang="sass">
.justWhite
  .q-field__native span
    color: white

  .q-field__inner
    border: 1px solid white

  .q-chip__content span
    color: black

  .q-field__append, .q-field__suffix, .q-field__native, .q-field__input
    color: white

</style>
