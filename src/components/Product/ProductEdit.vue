<template>
  <div class="row items-start justify-start full-width">
    <q-btn no-caps align="left" :class="liteVersion?'':`full-width`" flat dense text-color="white" color="red"
           @click="showing = true">
      <template v-slot:default>
        <q-icon name="mdi-square-edit-outline" color="red" size="sm"/>
        <span class="q-pl-sm" v-if="!liteVersion">Editar producto</span>
      </template>
    </q-btn>
    <q-dialog ref="mymodal" v-model="showing">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Editar producto</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card square class="q-mt-sm bg-darkless-blue" flat>
            <q-card-section class="q-mt-sm">
              <q-form @submit="submit">
                <div class="row q-gutter-xs">
                  <div class="col-12 col-md-3 text-center">
                    <q-btn
                      round
                      size="xl"
                      class="q-pa-md text-white"
                      no-caps
                      style="background: #2B2E36"
                      @click="$refs.photofile.$el.click()"
                    >
                      <span v-if="!photo_url" style="font-size: 14px">Añadir foto</span>
                      <q-avatar size="8rem" v-if="photo_url">
                        <img :src="photo_url" alt="dsdsd">
                      </q-avatar>
                    </q-btn>
                    <q-file
                      hidden
                      v-model="product.photo"
                      class="hidden"
                      ref="photofile"
                      accept=".jpg, image/*"
                      @input="urlImage"
                    />
                  </div>
                  <div class="col-12 col-md q-mt-sm q-mt-none-md text-white">
                    <div class="row items-center">
                      <div class="col-4">
                        Nombre:
                      </div>
                      <div class="col">
                        <q-input
                          v-model="product.name"
                          label-color="white"
                          placeholder="Moet Ice Rosé"
                          color="white"
                          outlined
                          input-class="text-white"
                          dense
                          :rules="[$rules.required()]"
                        />
                      </div>
                    </div>
                    <div class="row items-center justify-center q-pt-sm ">
                      <div class="col-4">
                        Precio Coste:
                      </div>
                      <div class="col">
                        <div class="row justify-center q-mt-md">
                          <div class="col">
                            <q-input
                              v-model="product.cost_price"
                              label-color="white"
                              placeholder="34.000 XAF"
                              color="white"
                              outlined
                              input-class="text-white"
                              dense
                              class="no-padding"
                              :rules="[$rules.decimal(), $rules.required()]"
                            />
                          </div>
                          <div class="col-4 text-center q-pt-sm"> Precio Venta:</div>
                          <div class="col">
                            <q-input
                              v-model="product.sell_price"
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
                    <div class="row items-center q-pt-sm">
                      <div class="col-4">
                        Categoría:
                      </div>
                      <div class="col">
                        <q-select
                          :options="categories"
                          options-dense
                          v-model="product.category_id"
                          :option-label="i => i.name"
                          label-color="white"
                          outlined
                          class="bordered"
                          dense
                          use-input
                          clearable
                          @filter="fnCategories"
                          :popup-content-class="$q.screen.gt.sm?`bg-dark-blue dark-blue text-white`:`bg-dark-blue`"
                          :placeholder="product.category_id?'':'Seleccione una categoría'"
                          color="white"
                          :rules="[$rules.required()]"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                <CategoryAdd class="full-width" :full-width="true" @newCategory="addCategory"/>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row items-center q-pt-sm">
                      <div class="col-4">
                        Descripción:
                      </div>
                      <div class="col">
                        <q-input
                          v-model="product.description"
                          label-color="white"
                          :placeholder="$q.screen.gt.sm?`Moet con sabor a fresa para invitados VIP.`:`Descripción`"
                          color="white"
                          outlined
                          input-class="text-white"
                          dense
                          autogrow
                          type="textarea"
                        />
                      </div>
                    </div>
                    <div class="row items-center q-pt-sm">
                      <div class="col-4">
                        Impresión etiqueta:
                      </div>
                      <div class="col">
                        <q-select
                          :options="tags"
                          options-dense
                          v-model="product.tag"
                          label-color="white"
                          outlined
                          class="bordered"
                          dense
                          use-input
                          popup-content-class="bg-dark-blue text-white"
                        />
                      </div>
                    </div>
                    <div class="row items-center q-pt-sm">
                      <div class="col-4">
                        Stock disponible:
                      </div>
                      <div class="col">
                        <div class="row items-center">
                          <div class="col">
                            <q-input
                              v-model="product.stock"
                              label-color="white"
                              outlined
                              class="bordered"
                              dense
                              :suffix="$q.screen.gt.sm?`unidades`:`u`"
                              input-class="text-white"
                              :rules="[$rules.required(), $rules.numeric()]"
                            />
                          </div>
                          <div class="col text-center q-px-sm" v-if="$q.screen.gt.sm">
                            <q-btn type="submit" :label="$q.screen.gt.sm?`Editar producto`:`Crear`" no-caps
                                   color="red-5"
                                   size="sm"
                                   rounded class="q-px-lg q-py-xs" dense/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row q-pt-md" v-if="$q.screen.lt.md">
                      <div class="col-12 text-center">
                        <q-btn type="submit" label="Editar producto" no-caps color="red-5" size="md"
                               rounded class="q-px-lg q-py-xs" dense/>
                      </div>
                    </div>
                  </div>
                  <div class="col-1"></div>
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
import {putProduct} from "src/store/Product/products";
import {getCategories} from "src/store/Category/categories";
import CategoryAdd from "components/Category/CategoryAdd";

export default {
  components: {CategoryAdd},
  props: {
    productNew: {type: Object},
    liteVersion: {type: Boolean, default: false},
    categories_all:{type:Array}
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
      if (!this.photo_url) {
        this.$notify.n('Debe agregar la foto del producto')
        return false;
      }
      let formattedProduct = objectToFormData(this.product)
      if (!formattedProduct.get('photo'))
        formattedProduct.delete('photo')
      const newProduct = await putProduct(formattedProduct)
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
