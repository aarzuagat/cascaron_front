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

                <div class="row text-white">
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
                <div class="col-12 text-white text-center q-py-sm">
                  <StockOperationChangeItem
                    v-for="(item,index) in allTags"
                    :item="item"
                    :key="item.id"
                    :index="index+1"
                    @deleted="updateThis"
                    v-if="operation.lote.product.tag === 'Todas las unidades'"
                  />
                  <q-input
                    v-model="quantity_selected"
                    dense
                    v-if="operation.lote.product.tag !== 'Todas las unidades'"
                  />
                </div>
                <div class="col-12">
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
                <div class="col-12 q-pt-sm">
                  <q-input
                    v-model="details"
                    filled
                    autogrow
                    placeholder="Explique por qué está eliminando esta compra"
                  />
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
import {changeOperation} from "src/store/Stock/stock";
import MyTitle from "components/Extras/MyTitle";
import {getProductsWithTags} from "src/store/Product/products";
import StockOperationChangeItem from "components/StockOperationChange/StockOperationChangeItem";

export default {
  name: "StockOperationCancel",
  components: {StockOperationChangeItem, MyTitle, StockOperationList},
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
      return this.product_selected.lotes.map(i => i.tags).flat(1) ?? []
    }
  },
  data() {
    return {
      changing: false,
      details: '',
      partial_list: [],
      products: [],
      products_all: [],
      product_selected: '',
      tags_selected: [],
      quantity_selected: 0,
      allTags:[]
    }
  },
  methods: {
    updateThis(elem) {
      console.log(elem)
      this.allTags = this.allTags.filter(i => i.tag !== elem.tag)
    },
    async findProducts() {
      const data = await getProductsWithTags(false)
      this.products = this.products_all = data
    },
    async submit() {
      const obj = {
        operation: this.operation.id,
        details: this.details,
        name: this.operation.lote.product.name,
        product_selected: this.product_selected,
        tags_selected: this.tags_selected.map(i => i.id),
        quantity_selected: this.quantity_selected,
      }
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
    this.allTags = this.operation.tags
  }
}
</script>
