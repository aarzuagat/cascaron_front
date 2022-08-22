<template>
  <div>
    <q-btn
      icon="mdi-trash-can"
      dense
      color="negative"
      @click="deleting = true"
    />
    <q-dialog ref="mymodal" v-model="deleting">
      <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
        <div class="col-12">
          <q-card flat square class="bg-darkless-blue no-padding">
            <q-toolbar>
              <span class="text-red">Eliminar producto de órden</span>
              <q-space/>
              <q-btn flat round dense color="red" icon="close" v-close-popup/>
            </q-toolbar>
          </q-card>
        </div>
        <div class="col-12">
          <q-card square class="q-mt-sm bg-darkless-blue" flat>
            <q-form @submit="deleteItem">
              <q-card-section class="q-mt-sm text-white">
                <div class="row">
                  <div class="col-12">
                    ¿Seguro que desea eliminar este elemento de la órden?
                  </div>
                  <div class="col-12 q-pt-sm">
                    <q-input
                      v-model="details"
                      filled
                      autogrow
                      :rules="[$rules.required()]"
                      placeholder="Explique por qué está eliminando esta compra"
                    />
                  </div>
                </div>
              </q-card-section>
              <FormCardAction custom-label="Eliminar producto"/>
            </q-form>
          </q-card>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import FormCardAction from "components/Extras/FormCardActions";
import {deleteItemOperation} from "src/store/Stock/stock";

export default {
  components: {FormCardAction},
  // name: 'ComponentName',
  props: {
    item: {type: Object}
  },
  data() {
    return {
      deleting: false,
      details: ''
    }
  },
  methods: {
    async deleteItem() {
      const elem = {
        id: this.item.id,
        tag: this.item.tag,
        details: this.details
      }
      const deleted = await deleteItemOperation(elem)
      console.log(deleted)
      this.deleting = false;
      this.$emit('deleted')
    }
  }
}
</script>
