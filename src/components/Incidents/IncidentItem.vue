<template>
  <div class="row text-white">
    <div class="col-1"> {{ index }}</div>
    <div class="col"> {{ incident.author }}</div>
    <div class="col"> {{ incident.description }}</div>
    <div class="col text-center">
      <span v-for="(product,index2) in incident.products" :key="product.id">{{ product.name }}
      <i v-if="index2+1 < incident.products.length">,</i>
      </span>
    </div>
    <div class="col-1">
      <div class="row">
        <IncidentEdit :incident-new="incident" @update="$emit('update')"/>
        <IncidentDelete :incident-new="incident" @update="$emit('update')"/>
      </div>
    </div>
  </div>
</template>

<script>
import IncidentEdit from "components/Incidents/IncidentEdit";
import IncidentDelete from "components/Incidents/IncidentDelete";

export default {
  components: {IncidentDelete, IncidentEdit},
  // name: 'ComponentName',
  props: {
    incident: {type: Object},
    index: {type: Number}
  },
  data() {
    return {}
  }
}
</script>
