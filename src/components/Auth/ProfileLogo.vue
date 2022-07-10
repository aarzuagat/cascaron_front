<template>
  <div>
    <q-btn rounded dense color="negative" size="sm">
      <q-avatar size="1.5rem">
        <img src="/img/image.jpg" alt="foto perfil">
      </q-avatar>
    </q-btn>
    <span v-if="user">{{user.name}}</span>
    <q-btn icon="mdi-logout" @click="logOut" dense flat/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  // name: 'ComponentName',
  computed: {
    ...mapGetters({
      user: 'mystore/user'
    })
  },
  data() {
    return {}
  },
  methods: {
    logOut() {
      this.$store.dispatch('mystore/logoutUser')
    }
  },
  mounted() {
  }
}
</script>
