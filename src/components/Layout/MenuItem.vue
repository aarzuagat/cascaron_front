<template>
  <q-btn class="full-width"  dense no-caps @click="$router.push({name:pathName})" flat text-color="white" color="red"
         align="left">
    <q-icon :name="icon" color="white" size="sm"/>
    <span class="q-pl-sm">{{ title }}</span>
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  props:{
    pathName:{type:String},
    title:{type:String},
    icon:{type:String},
  },
  data () {
    return {}
  }
}
</script>
