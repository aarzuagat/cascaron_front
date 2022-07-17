<template>
  <div class="row q-pt-sm ">
    <div class="col-12">
      <q-expansion-item
        icon="mdi-view-dashboard"
        label="Dashboard"
        class="full-width text-white"
        expand-icon-class="text-dark-blue"
        dense
      />
      <q-expansion-item
        expand-separator
        icon="mdi-storefront"
        label="Gestión de stock"
        class="full-width text-white"
        expand-icon-class="text-white"
        v-if="logged"
      >
        <div class="bg-dark-blue q-pl-xl">
          <q-btn icon="mdi-format-list-bulleted" align="left" flat no-caps label="Listado" class="full-width"/>
          <q-btn icon="mdi-plus-circle-outline" align="left" flat no-caps label="Listado" class="full-width"/>
          <q-btn icon="mdi-cash-register" align="left" flat no-caps label="Vender producto" class="full-width"/>
          <q-btn icon="mdi-file-search-outline" align="left" flat no-caps label="Listado" class="full-width"/>
        </div>
      </q-expansion-item>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  // name: 'ComponentName',
  computed: {
    ...mapGetters({
      logged:'mystore/loggedIn'
    })
  },
  data() {
    return {}
  }
}
</script>
