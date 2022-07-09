<template>
  <div>
    <q-input v-model="text" bg-color="darkless-blue" maxlength="100" label="Buscar un producto" class="no-padding "
             dense rounded input-class="text-white"
             outlined label-color="white">
      <template v-slot:append>
        <q-icon name="fa fa-search" color="white" size="15px"/>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      text: ''
    }
  }
}
</script>
<style>
.q-field__control-container,
.q-field__native {
  padding-top: 8px !important;
}

.q-field__control {
  height: 30px !important;
  min-height: 30px !important;
}
.q-field__append{
  margin-top: -3px;
}
.q-field__label{
  font-size: 15px !important;
  margin-top: -5px;
}
</style>
