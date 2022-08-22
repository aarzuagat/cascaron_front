<template>
  <div class="row q-pt-xs text-center">
    <div class="col-1">{{ index }}</div>
    <div class="col-5">{{ item.tag }}</div>
    <div class="col-2">
      <SOChangeItemDelete :item="item" @deleted="$emit('deleted', item)"/>
    </div>
  </div>
</template>

<script>
import SOChangeItemDelete from "components/StockOperationChange/SOChangeItemDelete";

export default {
  components: {SOChangeItemDelete},
  // name: 'ComponentName',
  props: {
    item: {type: Object},
    index: {type: Number}
  },
  data() {
    return {}
  }
}
</script>
