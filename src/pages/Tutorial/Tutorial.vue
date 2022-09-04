<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <MyTitle title="Videos tutoriales de LoveApp"/>
      </div>
      <div class="col-12 col-sm-6 q-px-sm" v-for="(item,key) in list" :key="key">
        <TutorialItem :item="item" :index="key+1"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import TutorialItem from "components/Tutorial/TutorialItem";
import MyTitle from "components/Extras/MyTitle";

export default {
  components: {MyTitle, TutorialItem},
  // name: 'PageName',
  data() {
    return {
      list: [
        {url: 'videos/crear-productos.webm', description: "Crear un producto"},
        {url: 'videos/apregar-productos-stock.webm', description: "Agregar productos al stock"},
        {url: 'videos/otras-formas-vender-producto.webm', description: "Otras formas de vender productos"},
        {url: 'videos/incidentes-y-estadisticas.webm', description: "Incidentes y estadísticas"},
      ]
    }
  }
}
</script>
