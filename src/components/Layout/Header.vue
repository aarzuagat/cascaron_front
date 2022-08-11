<template>
  <q-header elevated class="bg-dark-blue text-white" height-hint="98">
    <div class="row shadow-1 items-center ">
      <div class="col-auto" v-if="$q.screen.lt.md">
        <q-btn dense flat round icon="menu" @click="setLeft"/>
      </div>
      <div class="col-2 q-pl-sm q-py-xs">
        <img src="/icons/logo.png" style="max-height: 2rem" @click="$router.push('/')">
      </div>
      <div class="col">
        <ProductSearcher/>
      </div>
      <div class="col-6 q-pr-sm text-right">
        <ProfileLogo v-if="logged"/>
        <LoginButton v-else/>
      </div>
    </div>

  </q-header>
</template>

<script>
import ProductSearcher from "components/Product/ProductSearcher";
import ProfileLogo from "components/Auth/ProfileLogo";
import LoginButton from "components/Auth/LoginButton";
import {mapGetters} from "vuex";

export default {
  components: {LoginButton, ProfileLogo, ProductSearcher},
  props: {
    side: {type: Boolean},
  },
  computed: {
    ...mapGetters({
      logged: 'mystore/loggedIn'
    })
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
