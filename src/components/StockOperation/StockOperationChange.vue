<template>
  <div>
    <q-btn dense no-caps @click="changing = true" flat text-color="white" color="white"
           align="left">
      <q-icon name="mdi-swap-horizontal" color="info" size="sm"/>
      <q-tooltip>Cambiar venta</q-tooltip>
    </q-btn>
    <q-dialog ref="mymodal" v-model="changing" @before-show="findProducts">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Cambiar pedido de "{{ operation.lote.product.name }}"</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card square class="q-mt-sm bg-darkless-blue" flat>
            <q-form @submit="submit">
              <q-card-section>
                <div class="row text-white flex-center">
                  <q-radio v-model="cancel_value" keep-color val="complete" label="Completo" color="white"
                           checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
                  <q-radio v-model="cancel_value" keep-color val="partial" label="Parcial" color="white"
                           checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
                </div>
                <div class="row">
                  <div class="col-12 text-white text-justify" v-if="cancel_value === 'complete'">
                    ¿Seguro que desea cambiar este pedido en su totalidad?
                  </div>
                  <div class="col-12 text-white text-justify">
                    <div class="row text-left">
                      <div class="col-12">
                        <MyTitle title="Detalles de la compra"/>
                      </div>
                      <div class="col-12 q-pb-sm text-right">
                        Fecha de compra: {{ $formatterDate(operation.created_at) }}
                        <br>Nombre: {{ operation.lote.product.name }}
                        <br>Precio de venta: {{ $formatterCurrency(operation.lote.sell_price) }}
                        <br>Cantidades vendidas: {{ operation.quantity }}
                      </div>
                    </div>
                  </div>
                  <div class="col-12 text-white text-center" v-if="cancel_value === 'partial'">
                    <div v-if="operation.lote.product.tag === 'Todas las unidades'">
                      <i>Escoja los productos que <b>desea reponer</b> al stock</i> <br>
                      <q-checkbox
                        v-for="item in operation.tags"
                        v-model="partial_list"
                        keep-color
                        :val="item.id"
                        :label="item.tag"
                        color="white"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                        :key="item.id"
                      />
                    </div>
                    <div v-else class="q-py-md">
                      <q-input
                        v-model="quantity"
                        label="Cantidad a devolver"
                        dense
                        :rules="[$rules.numeric()]"
                        color="white"
                        label-color="white"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <q-input
                      v-model="details"
                      filled
                      autogrow
                      :rules="[$rules.required()]"
                      placeholder="Explique por qué está cambiando esta compra"
                    />
                  </div>

                  <div class="col-12" >
                    <q-select
                      :options="products"
                      :option-label="i => i.name"
                      v-model="product_selected"
                      label-color="white"
                      dense
                      options-dense
                      options-dark
                      label="Escoja el producto nuevo"
                      :loading="products_all.length === 0"
                    />
                  </div>
                  <div class="col-12 q-pt-sm" v-if="products.length && isProductTag">
                    <q-select
                      :options="tags"
                      :option-label="i => i.tag"
                      v-model="tags_selected"
                      label-color="white"
                      dense
                      multiple
                      options-dense
                      options-dark
                      label="Escoja las etiquetas de los productos"
                    />
                  </div>
                  <div class="col-12" v-if="products.length && product_selected!== '' && !isProductTag">
                    <q-input
                      v-model="quantity_selected"
                      label-color="white"
                      dense
                      :rules="[$rules.required(), $rules.minValue(1), $rules.numeric()]"
                      label="Escoja la cantidad de unidades"
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn no-caps label="Cancelar" dense color="warning" v-close-popup/>
                <q-btn no-caps label="Confirmar cancelación" dense color="primary" type="submit"/>
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import StockOperationList from "components/StockOperation/StockOperationList";
import {changeOperation, deleteOperation} from "src/store/Stock/stock";
import MyTitle from "components/Extras/MyTitle";
import {getProducts, getProductsWithTags} from "src/store/Product/products";

export default {
  name: "StockOperationCancel",
  components: {MyTitle, StockOperationList},
  props: {
    operation: {type: Object}
  },
  computed: {
    isProductTag() {

      return this.tags.length > 0
    },
    tags() {
      if (this.product_selected === '')
        return []
      const tags = this.product_selected.lotes.map(i => i.tags).flat(1) ?? []
      console.log(tags)
      return tags
    }
  },
  data() {
    return {
      changing: false,
      cancel_value: 'complete',
      details: '',
      quantity: 1,
      partial_list: [],
      products: [],
      products_all: [],
      product_selected: '',
      tags_selected: [],
      quantity_selected: 0,
    }
  },
  methods: {
    async findProducts() {
      const data = await getProductsWithTags(false)
      console.log(data)
      this.products = this.products_all = data
    },
    async submit() {
      const obj = {
        is_partial: this.cancel_value === 'partial',
        operation: this.operation.id,
        details: this.details,
        quantity: this.quantity,
        partial_list: this.partial_list,
        name: this.operation.lote.product.name,
        product_selected: this.product_selected,
        tags_selected: this.tags_selected.map(i => i.id),
        quantity_selected: this.quantity_selected,
      }
      console.log(obj)
      await changeOperation(obj)
      this.changing = false;
      this.details = ''
      this.partial_list = []
      this.product_selected = ''
      this.tags_selected = []
      this.quantity_selected = 0
      this.$emit('update')
    }
  },
  mounted() {
  }
}
</script>
