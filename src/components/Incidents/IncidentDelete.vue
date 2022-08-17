<template>
  <div>
    <q-btn no-caps align="left" flat dense text-color="white" color="red"
           @click="showing = true">
      <template v-slot:default>
        <q-icon name="mdi-trash-can" color="red" size="sm"/>
        <q-tooltip class="q-pl-sm">Eliminar incidente</q-tooltip>
      </template>
    </q-btn>
    <q-dialog ref="mymodal" v-model="showing">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Eliminar incidente</span>
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
                  <div class="col-12">¿Seguro que desea eliminar el incidente de "{{ incident.author }}" del
                    {{ $formatterDate(incidentNew.created_at) }}?
                  </div>
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
import {deleteIncident} from "src/store/Incident/incident";

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
    }
  },
  methods: {
    async submit() {
      const newProduct = await deleteIncident(this.incident)
      this.showing = false;
      this.$emit('update')
    },
    setItems() {
      this.incident = destructurateObject(this.incident, this.incidentNew)
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
