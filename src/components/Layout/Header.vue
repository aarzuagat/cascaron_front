<template>
  <q-header elevated class="bg-dark-blue text-white" height-hint="98">
    <div class="row shadow-1 items-center ">
      <div class="col-auto" v-if="$q.screen.lt.md">
        <q-btn dense flat round icon="menu" @click="setLeft"/>
      </div>
      <div class="col-2 q-pl-sm q-py-xs">
          <img src="/icons/logo.png" style="max-height: 2rem">
      </div>
      <div class="col">
        <ProductSearcher/>
      </div>
      <div class="col-6 q-pr-sm text-right">
        <q-btn rounded dense color="negative" size="sm">
          <q-avatar size="1.5rem">
            <img src="/img/image.jpg" alt="foto perfil">
          </q-avatar>
        </q-btn>
        Ramón Ela Mba
      </div>
    </div>

  </q-header>
</template>

<script>
import ProductSearcher from "components/ProductSearcher";

export default {
  components: {ProductSearcher},
  // name: 'ComponentName',
  props: {
    side: {type: Boolean}
  },
  data() {
    return {}
  },
  methods: {
    setLeft() {
      this.left = !this.side
      this.$emit('updated', this.left)
    }
  }
}
</script>
