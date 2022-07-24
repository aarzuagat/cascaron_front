<template>
  <div class="row q-pt-sm ">
    <div class="col-12">
      <div class="row ">
        <q-btn class="full-width" flat no-caps :to="{name:'home'}">
          <div class="row full-width">
            <div class="col-2 text-left">
              <q-icon name="mdi-view-dashboard" color="white"/>
            </div>
            <div class="col q-pl-md text-white text-left">
              <span>Dashboard</span>
            </div>
          </div>
        </q-btn>
      </div>
      <q-expansion-item
        expand-separator
        icon="mdi-storefront"
        label="Gestión de stock"
        class="full-width text-white"
        expand-icon-class="text-white"
        v-if="logged"
      >
        <div class="bg-dark-blue q-pl-xl">
          <q-btn icon="mdi-format-list-bulleted" to="/stock" align="left" flat no-caps label="Listado"
                 class="full-width"/>
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
      logged: 'mystore/loggedIn'
    })
  },
  data() {
    return {}
  }
}
</script>
