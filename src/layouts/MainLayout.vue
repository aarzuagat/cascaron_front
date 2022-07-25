<template>
  <q-layout view="hHh lpR fFf" class="bg-darkless-blue">

    <Header @updated="updateSide" :side="left"/>

    <q-drawer show-if-above v-model="left" side="left" class="q-mt-sm"
              content-class="bg-dark-blue">
      <Menu @updated="key++"/>
    </q-drawer>

    <q-page-container :key="key">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import Menu from "components/Layout/Menu";
import Header from "components/Layout/Header";

export default {
  components: {Header, Menu},
  data() {
    return {
      left: false,
      key:0
    }
  },
  methods: {
    updateSide(side) {
      this.left = side
    }
  }
}
</script>
