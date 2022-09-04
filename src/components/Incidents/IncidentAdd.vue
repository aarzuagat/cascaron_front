<template>
  <div>
    <q-btn label="Agregar incidente" @click="adding = true" no-caps dense text-color="white"/>

    <q-dialog ref="mymodal" v-model="adding">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Agregar incidente</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-form @submit="submitAll">
            <q-card square class="q-mt-sm bg-darkless-blue" flat>
              <div class="row q-pa-md">
                <div class="col-12">
                  <q-input
                    v-model="incident.author"
                    :rules="[$rules.required()]"
                    label="Nombre del causante del incidente"
                    input-class="text-white"
                    label-color="white"
                    dense
                  />
                </div>
                <div class="col-12">
                  <q-select
                    v-model="incident.products"
                    :options="products"
                    multiple
                    :option-label="i => i.name"
                    options-dense
                    :rules="[$rules.required()]"
                    label="Productos involucrados en el incidente"
                    input-class="text-white"
                    label-color="white"
                    dense
                    options-dark
                    :loading="products.length === 0"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    v-model="incident.description"
                    :rules="[$rules.required(), i => i.length > 5]"
                    label="Descripción del incidente"
                    input-class="text-white"
                    label-color="white"
                    type="textarea"
                    dense
                  />
                </div>
              </div>
              <FormCardAction/>
            </q-card>
          </q-form>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import {getProductsLite} from "src/store/Product/products";
import {objectToJSON} from "src/utils/utils";
import {postIncident} from "src/store/Incident/incident";
import FormCardAction from "components/Extras/FormCardActions";

export default {
  name: 'IncidentAdd',
  components: {FormCardAction},
  data() {
    return {
      adding: false,
      incident: {
        author: '',
        description: '',
        user_id: '',
        products: []
      },
      products: []
    }
  },
  methods: {
    async findProducts() {
      this.products = await getProductsLite()
    },
    async submitAll() {
      const obj = objectToJSON(this.incident)
      obj.products_id = this.incident.products.map(i => i.id)
      const saved = await postIncident(obj)
      this.adding = false;
      this.$emit('update')
    },
    cleanAll() {
      this.incident = {
        author: '',
        description: '',
        user_id: '',
        products: []
      }
    }
  },
  mounted() {
    this.findProducts()
  }
}
</script>
