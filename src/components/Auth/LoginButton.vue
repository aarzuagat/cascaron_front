<template>
  <div>
    <q-btn label="Iniciar sesión" color="dark" rounded @click="showing = true"/>
    <q-dialog v-model="showing">
      <q-card flat class="bg-dark-blue" :style="$q.screen.lt.md?`width: 90vw`:`width: 40vw`">
        <q-form @submit="submit">
          <q-bar style="height: auto" class="text-white bg-darkless-blue q-py-sm">
            <div style="font-weight: 600">Iniciar sesión</div>
            <q-space/>
            <q-btn flat round dense icon="close" v-close-popup/>
          </q-bar>
          <q-card-section>
            <q-input
              v-model="user.email"
              :rules="[$rules.required(), $rules.email()]"
              label="Email"
              dense
              label-color="white"
              input-class="text-white"
            />
            <q-input
              v-model="user.password"
              :rules="[$rules.required(), $rules.minLength(8)]"
              label="Contraseña"
              dense
              label-color="white"
              input-class="text-white"
            />
          </q-card-section>
          <FormCardAction custom-label="Autenticar"/>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import FormCardAction from "components/Extras/FormCardActions";
import requestPermission from "src/store/firebase/firebase";
import {getMessaging, getToken} from "firebase/messaging";

export default {
  components: {FormCardAction},
  data() {
    return {
      showing: false,
      user: {
        email: 'admin@admin.love',
        password: 'admin123',
      }
    }
  },
  methods: {
    async submit() {
      this.$q.loading.show()
      const user = await this.$store.dispatch('mystore/loginUser', this.user)
      this.$q.loading.hide()

    }
  }
}
</script>
