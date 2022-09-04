<template>
  <div class="row bg-dark-blue q-mb-sm items-center">
    <div class="col-12 text-white q-pa-sm">
      <my-title lite_version align="center" :title="`Video ${index}: ${item.description}`"/>
      <VideoItem :url="item.url"/>
    </div>

  </div>
</template>

<script>
import VideoItem from "components/Extras/VideoItem";
import MyTitle from "components/Extras/MyTitle";

export default {
  components: {MyTitle, VideoItem},
  // name: 'ComponentName',
  props: {
    index: {type: Number},
    item: {type: Object}
  },
  data() {
    return {}
  }
}
</script>
