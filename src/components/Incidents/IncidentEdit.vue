<template>
  <div>
    <q-btn no-caps align="left" flat dense text-color="white" color="red"
           @click="showing = true">
      <q-icon name="mdi-square-edit-outline" color="red" size="sm"/>
      <q-tooltip class="q-pl-sm">Editar incidente</q-tooltip>
    </q-btn>
    <q-dialog ref="mymodal" v-model="showing">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Actualizar incidente</span>
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
              <FormCardAction :update="true"/>
            </q-card>
          </q-form>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import {destructurateObject, objectToFormData, objectToJSON} from "src/utils/utils";
import {getProductsLite, putProduct} from "src/store/Product/products";
import {getCategories} from "src/store/Category/categories";
import CategoryAdd from "components/Category/CategoryAdd";
import FormCardAction from "components/Extras/FormCardActions";
import {postIncident, putIncident} from "src/store/Incident/incident";

export default {
  components: {FormCardAction, CategoryAdd},
  props: {
    incidentNew: {type: Object},
  },
  data() {
    return {
      showing: false,
      incident: {
        id: '',
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
    setItems() {
      this.incident = destructurateObject(this.incident, this.incidentNew)
    },
    async submitAll() {
      const obj = this.incident
      obj.products_id = this.incident.products.map(i => i.id)
      const saved = await putIncident(obj)
      console.log(saved)
      this.showing = false;
      this.$emit('update')
    }
  },
  mounted() {
    this.setItems()
    this.findProducts()
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
