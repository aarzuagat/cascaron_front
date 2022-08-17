<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import accessibility from "highcharts/modules/accessibility";

export default {
  name: "ColumnChart",
  components: {
    highcharts: Chart,
  },
  props: {
    dataseries: {type: Array},
    title: {type: String},
    categories: {type: Array},
    subtext: {type: String}
  }
  ,
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column'
        },
        credits: {
          enabled: false
        },
        title: {
          text: this.title
        },
        xAxis: {
          categories: this.categories,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: this.subtext
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: this.dataseries
      }
    };
  }
};
</script>
