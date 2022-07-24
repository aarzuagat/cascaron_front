<template>
  <div class="row items-start justify-start ">
    <q-btn no-caps align="left" flat dense text-color="white" color="red" @click="adding = true"
           :class="liteVersion?'':'full-width'">
      <q-icon name="mdi-numeric-positive-1" color="red" size="sm"/>
      <span v-if="!liteVersion" class="q-pl-sm">Añadir stock</span>
    </q-btn>
    <q-dialog ref="mymodal" v-model="adding">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Agregar al stock del producto "{{ product.name }}"</span>
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
                    >
                      <q-avatar size="8rem" v-if="photo_url">
                        <img :src="photo_url" alt="dsdsd">
                      </q-avatar>
                    </q-btn>

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
                          disable
                          :rules="[$rules.required()]"
                        />
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
                          disable
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
                          disable
                          popup-content-class="bg-dark-blue text-white"
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
                    <div class="row items-center justify-center">
                      <div class="col-4">
                        Unidades a agregar:
                      </div>
                      <div class="col">
                        <q-input
                          v-model="product.quantity"
                          label-color="white"
                          outlined
                          class="bordered"
                          dense
                          :suffix="$q.screen.gt.sm?`unidades`:`u`"
                          input-class="text-white"
                          :rules="[$rules.required(), $rules.decimal()]"
                        />
                      </div>
                    </div>


                    <div class="row q-pt-md">
                      <div class="col-12 text-center">
                        <q-btn type="submit" label="Agregar al stock" no-caps color="red-5" size="md"
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
import {destructurateObject} from "src/utils/utils";
import {postStock} from "src/store/Stock/stock";

export default {
  props: {
    liteVersion: {type: Boolean, default: false},
    productNew: {type: Object}
  },
  computed: {
    photo_url() {
      return process.env.static + this.product.photo
    }
  },
  data() {
    return {
      adding: false,
      product: {
        id: '',
        name: '',
        photo: '',
        description: '',
        quantity: 1,
        cost_price: '',
        sell_price: '',
        tag: '',
      },
      tags: [
        'Todas las unidades',
        'Sin etiqueta',
      ],
    }
  },
  methods: {
    async submit() {
      const newStock = await postStock(this.product)
      this.adding = false
      this.$emit('updated')

    },
    setItems() {
      this.product = destructurateObject(this.product, this.productNew)
      this.product.quantity = 1
    }
  },
  mounted() {
    this.setItems()
  }
}
</script>
