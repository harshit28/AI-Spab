<template>
  <div class="dashboard-page">
    <h1 class="page-title">Patient Report</h1>
    <div v-if="selected">
      <b-row>
        <b-col xs="4">
          <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
        </b-col>
        <b-col xs="4">
        </b-col>
        <b-col xs="4">
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row>
        <b-col xs="12">
          <Widget
            title="<h5>Support <span class='fw-semi-bold'>Requests</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
          >
            <div class="table-responsive">
              <table class="table table-striped table-lg mb-0 requests-table">
                <thead>
                  <tr class="text-muted">
                    <th>DATE OF VISIT</th>
                    <th>TIME OF VISIT</th>
                    <th>DIAGNOSIS</th>
                    <th>MEDICINE PRESCRIBED</th>
                    <th>NUMBER OF DOSAGE</th>
                    <th>SEVERITY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in mock.table"
                    :key="row.id"
                  >
                    <td>{{row.name}}</td>
                    <td>{{row.email}}</td>
                    <td>{{row.product}}</td>
                    <td>{{row.price}}</td>
                    <td>{{row.date}}</td>
                    <td>{{row.city}}</td>
                    <td>{{row.status}}</td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Widget>
        </b-col>
      </b-row>
    <b-row>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Total Visits">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>18</h2>
              <!-- <i class="la la-arrow-right text-primary la-lg rotate-315" /> -->
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>7</h6><p class="text-muted mb-0 mr"><small>In Person</small></p>
              </div>
              <div class="mt">
                <h6>4</h6><p class="text-muted mb-0"><small>On call</small></p>
              </div>
              <div class="mt">
                <h6>2</h6><p class="text-muted mb-0 mr"><small>Emergency</small></p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
	  <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Health Status">
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>Healthy</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.primary]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
         
            <div class="d-flex align-items-center">
              <p class="width-150"><small>Unhealthy</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.danger]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Common Disease" >
            <highcharts :options="donut"></highcharts>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Feedback" >
            <p class="text-muted d-flex flex-wrap">
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-primary text-danger mr-xs" style="font-size: 4px;">
                  .
                </span>
                  Positive
              </small>
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-danger text-primary mr-xs" style="font-size: 4px;">
                  .
                </span>
                Negative
              </small>
            </p>
            <h6>This Month</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="primary" :value="80" :max="100" />
            <b-progress class="mb" style="height: 5px"
              variant="danger" :value="20" :max="100" />
            <h6>Last Month</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="primary" :value="70" :max="100" />
            <b-progress style="height: 5px"
              variant="danger" :value="30" :max="100" />
          </Widget>
        </div>
      </b-col>
      
    </b-row>
   
    </div>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import mock from './mock1';
import VueDropdown from 'vue-dynamic-dropdown';
import { Chart } from 'highcharts-vue';

export default {
  name: 'Doc_dashboard',
  components: {
    Widget, BigStat, highcharts: Chart, VueDropdown
  },
  data() {
    return {
      mock,
      selected: true,
      config: {
            options: [
                {
                    value: "Mark Otto"
                },
                {
                    value: "Jacob Thornton"
                },
                {
                    value: "Larry the Bird"
                },
                {
                    value: "Joseph May"
                },
                {
                    value: "Peter Horadnia"
                },
            ],
            prefix: "Select Patient",
        }
    };
  },
  methods: {
    setNewSelectedOption(selectedOption) {
      this.selected = false
      this.config.placeholder = selectedOption.value;
    },
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getRevenueData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['Flu', 'Fatigue', 'Cough'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    }
  },
  computed: {
    donut() {
      let revenueData = this.getRevenueData();
      let {danger, info, primary} = this.appConfig.colors;
      let series = [
        {
          name: '%',
          data: revenueData.map(s => {
            return {
              name: s.label,
              y: s.data
            }
          })
        }
      ];
      return {
        chart: {
          type: 'pie',
          height: 120
        },
        credits: {
          enabled: false
        },
        title: false,
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            borderColor: null,
            showInLegend: true,
            innerSize: 60,
            size: 100,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        },
        colors: [danger, info, primary],
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
          itemStyle: {
            color: '#495057',
            fontWeight: 100,
            fontFamily: 'Montserrat'
          },
          itemMarginBottom: 5,
          symbolRadius: 0
        },
        exporting: {
          enabled: false
        },
        series
      };
    }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
