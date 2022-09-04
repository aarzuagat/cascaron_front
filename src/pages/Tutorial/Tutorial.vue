<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <MyTitle title="Videos tutoriales de LoveApp"/>
      </div>
      <div class="col-12 col-sm-4 q-px-sm" v-for="(item,key) in list" :key="key">
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
        {url: 'videos/1.webm', description: "Introducción a LoveApp"},
        {url: 'videos/2.webm', description: "Crear un producto"},
        {url: 'videos/3.webm', description: "Imprimir etiquetas"},
        {url: 'videos/4.webm', description: "Editar un producto"},
      ]
    }
  }
}
</script>
