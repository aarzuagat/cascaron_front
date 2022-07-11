<template>
  <q-card-actions align="right">
    <q-btn
      label="Cancelar"
      color="dark-blue"
      v-close-popup
      v-if="!lite"
      :no-caps="capittal_letters"
    />
    <q-btn
      :disable="!available"
      :label="customLabel?customLabel:update?'Actualizar':`Crear`"
      type="submit"
      :color="color"
      v-if="!lite"
      :no-caps="capittal_letters"
    />
    <q-btn
        :disable="!available"
        :label="customLabel?customLabel:update?'Actualizar':`Crear`"
        :color="color"
        v-if="lite"
        :no-caps="capittal_letters"
        v-close-popup
    />
  </q-card-actions>
</template>

<script>
export default {
  name: 'FormCardAction',
  props: {
    update: {
      type: Boolean,
      default: false
    },
    capittal_letters: {
      type: Boolean,
      default: true
    },
    lite: {
      type: Boolean,
      default: false
    },
    available: {
      type: [Boolean, Number],
      default: true
    },
    customLabel: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'darkless-blue'
    }
  },
  data() {
    return {}
  }
}
</script>
