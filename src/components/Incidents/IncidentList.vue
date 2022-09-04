<template>
  <div class="row">
    <div class="col-12">
      <MyTitle title="Lista de incidentes"/>
    </div>
    <div class="col-12 text-right">
      <IncidentAdd @update="findIncidents"/>
    </div>
    <div class="col-12 q-pt-sm" v-if="incidents.length">
      <div class="row text-white bb">
        <div class="col-1">No.</div>
        <div class="col">Causante</div>
        <div class="col">Detalles</div>
        <div class="col">Productos involucrados</div>
        <div class="col-1">Acciones</div>
      </div>
      <IncidentItem
        v-for="(item,key) in incidents"
        :key="key"
        :incident="item"
        :index="key+1"
        @update="findIncidents"
      />
    </div>
    <div class="col-12" v-else>
      <NoData/>
    </div>

  </div>
</template>

<script>
import IncidentItem from "components/Incidents/IncidentItem";
import {getIncidents} from "src/store/Incident/incident";
import NoData from "components/Extras/NoData";
import MyTitle from "components/Extras/MyTitle";
import IncidentAdd from "components/Incidents/IncidentAdd";

export default {
  components: {IncidentAdd, MyTitle, NoData, IncidentItem},
  // name: 'ComponentName',
  data() {
    return {
      incidents: []
    }
  },
  methods: {
    async findIncidents() {
      this.incidents = await getIncidents()
    }
  },
  mounted() {
    this.findIncidents()
  }
}
</script>
