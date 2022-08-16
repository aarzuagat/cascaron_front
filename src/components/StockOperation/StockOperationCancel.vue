<template>
  <div>
    <q-btn dense no-caps @click="canceling = true" flat text-color="white" color="red"
           align="left">
      <q-icon name="mdi-cancel" color="red" size="sm"/>
      <q-tooltip>Cancelar</q-tooltip>
    </q-btn>
    <q-dialog ref="mymodal" v-model="canceling">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Cancelar pedido de producto "{{ operation.lote.product.name }}"</span>
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
                  <q-radio v-model="cancel_value" keep-color val="complete" label="Completa" color="white"
                           checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
                  <q-radio v-model="cancel_value" keep-color val="partial" label="Parcial" color="white"
                           checked-icon="task_alt" unchecked-icon="panorama_fish_eye"/>
                </div>
                <div class="row">
                  <div class="col-12 text-white text-justify" v-if="cancel_value === 'complete'">
                    ¿Seguro que desea cancelar esta compra en su totalidad?
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
                      type="textarea"
                      :rules="[$rules.required()]"
                      placeholder="Explique por qué está cancelando esta compra"
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
import {deleteOperation} from "src/store/Stock/stock";
import MyTitle from "components/Extras/MyTitle";

export default {
  name: "StockOperationCancel",
  components: {MyTitle, StockOperationList},
  props: {
    operation: {type: Object}
  },
  data() {
    return {
      canceling: false,
      cancel_value: 'partial',
      details: '',
      quantity: 1,
      partial_list: []
    }
  },
  methods: {
    async submit() {
      const obj = {
        is_partial: this.cancel_value === 'partial',
        operation: this.operation.id,
        details: this.details,
        quantity: this.quantity,
        partial_list: this.partial_list,
        name: this.operation.lote.product.name
      }

      await deleteOperation(obj)
      this.canceling = false;
      this.details = ''
      this.partial_list = []
      this.$emit('update')
    }
  },
  mounted() {
  }
}
</script>
