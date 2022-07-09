<template>
  <q-layout view="hHh lpR fFf" class="bg-darkless-blue">

    <q-header elevated class="bg-dark-blue text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="left" side="left"  class="q-mt-sm"
              content-class="bg-dark-blue">
      <Menu/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import Menu from "components/Layout/Menu";

export default {
  components: {Menu},
  data() {
    return {
      left: false
    }
  }
}
</script>
