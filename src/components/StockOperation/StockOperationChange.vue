<template>
  <div>
    <q-btn dense no-caps @click="changing = true" flat text-color="white" color="red"
           align="left">
      <q-icon name="mdi-reply" color="info" size="sm"/>
      <q-tooltip>Cambiar pedido</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changing: false
    }
  }
}
</script>
