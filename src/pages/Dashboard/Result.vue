<template>
  <div class="dashboard-page">
    <h1 class="page-title">Patient History</h1>
    <b-row>
        <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Common Symptoms" close>
            <highcharts :options="donut"></highcharts>
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Visit to Doctor(Annualy)" >
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332</h2>
            </div>
            
          </Widget>
        </div>
      </b-col>
    
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Health Meter" close>
            <p class="text-muted d-flex flex-wrap">
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-danger text-danger mr-xs" style="font-size: 4px;">
                  .
                </span>
                  This Period
              </small>
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-primary text-primary mr-xs" style="font-size: 4px;">
                  .
                </span>
                Last Period
              </small>
            </p>
            <h6>Unhealth</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="danger" :value="60" :max="100" />
            <b-progress class="mb" style="height: 5px"
              variant="primary" :value="35" :max="100" />
            <h6>Health</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="danger" :value="40" :max="100" />
            <b-progress style="height: 5px"
              variant="primary" :value="55" :max="100" />
          </Widget>
        </div>
      </b-col>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Patient Overview" close>
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small></small>Flu</p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.danger]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>Infection</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.info]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center">
              <p class="width-150"><small>Cold</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="[appConfig.colors.primary]"
                  :height="40"
                  stroke-width="4"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    
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
                    <th>DATE</th>
                    <th>SYMPTOMS</th>
                    <th>DAYS OF RECOVERY</th>
                    <th>VISITS TO DOCTOR</th>
                    <th>DIAGMOSIS</th>
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
                    <td>
                      <b-button
                        :variant="row.status === 'Pending'
                          ? 'success'
                          : row.status === 'Declined' ? 'danger' : 'info'"
                        class="p-1 px-3 btn-xs"
                      >
                        {{row.status}}
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Widget>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from './components/BigStat/BigStat';
import mock from './mock2';

import { Chart } from 'highcharts-vue';

export default {
  name: 'Result',
  components: {
    Widget, BigStat, highcharts: Chart
  },
  data() {
    return {
      mock
    };
  },
  methods: {
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
      const accessories = ['Allergy', 'Fungal Infection', 'Fever'];

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
          name: 'Revenue',
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
