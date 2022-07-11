<template>
  <div>
    <q-btn dense label="Agregar nueva categoría" color="dark-blue" no-caps :class="fullWidth?`full-width`:''"
           @click="adding=true"/>
    <q-dialog v-model="adding">
      <q-card style="max-width: 40vw; width: 38vw" class="bg-dark-blue">
        <q-bar style="height: auto" class="text-red  q-py-sm">
          <div style="font-weight: 600">Agregando nueva categoría</div>
          <q-space/>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-bar>
        <q-form @submit="submit">
          <q-card-section>
            <div class="row items-center">
              <div class="col-3 text-center text-white">
                Categoría
              </div>
              <div class="col">
                <q-input
                  v-model="category.name"
                  label-color="white"
                  placeholder="Bebidas alcohólicas"
                  color="white"
                  outlined
                  input-class="text-white"
                  dense
                  class="bordered"
                />
              </div>
            </div>
          </q-card-section>
          <FormCardAction custom-label="Agregar"/>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import FormCardAction from "components/Extras/FormCardActions";
import {postCategories} from "src/store/Category/categories";

export default {
  components: {FormCardAction},
  props: {
    fullWidth: {type: Boolean, default: false}
  },
  data() {
    return {
      adding: false,
      category: {
        name: ''
      }
    }
  },
  methods: {
    async submit() {
      const newCategory = await postCategories(this.category);
      this.adding = false;
      this.$emit('newCategory', newCategory)
    }
  }
}
</script>
