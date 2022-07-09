<template>
  <div>
    <q-btn color="red-5" class="q-px-sm" dense no-caps label="Crear nuevo producto" rounded @click="adding = true"/>
    <q-dialog v-model="adding">
      <q-card flat>
        <q-bar style="height: auto" class="text-white bg-primary q-py-sm">
          <div style="font-weight: 600">Crear nuevo producto</div>
          <q-space/>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-bar>
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data() {
    return {
      adding: false
    }
  }
}
</script>
