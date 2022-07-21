<template>
  <q-dialog v-model="adding">
    <div class="row justify-center justWhite" style="max-width: 75vw; width: 70vw">
      <div class="col-12">
        <q-card flat square class="bg-darkless-blue no-padding">
          <q-toolbar>
            <span class="text-red">Crear nuevo producto</span>
            <q-space/>
            <q-btn flat round dense color="red" icon="close" v-close-popup/>
          </q-toolbar>
        </q-card>
      </div>
      <div class="col-12">
        <q-card square class="q-mt-sm bg-darkless-blue" flat>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  props:{

  },
  data () {
    return {}
  }
}
</script>
