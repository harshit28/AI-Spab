<template>
  <div class="dashboard-page">
    <h1 class="page-title">Disease Diagnosis</h1>
    <b-row>
      <b-col lg="12" md="12" xs="12">
        <div class="pb-xlg h-100">
            <div v-if="submited=='1'">
              <Widget class="h-100 mb-0">
              <form class="mt" @submit.prevent="result">
                <div class="d-flex justify-content-between align-items-center mb-lg">
                  <vue-taggable-select
                    placeholder="Select Symptoms"
                    v-model="Symptoms"
                    :taggable="true"
                    :options="sym"
                  ></vue-taggable-select>
                </div>
                <b-button
                  type="submit"
                  size="sm"
                  class="btn"
                  variant="inverse"
                  v-on:click="next()"
                  style="
    width: -webkit-fill-available;
    margin-left: 30%;margin-right: 30%;
"
                >Analyse</b-button>
              </form>
              </Widget>
            </div>
            <div v-else-if="submited=='2'">
          <Widget class="h-100 mb-0">
              <ring-loader :loading="loading" :color="red" :size="size"></ring-loader>
          </Widget>
            </div>
            <div v-else style="height:550px;">
              
          <Widget class="h-100 mb-0" >
            <div v-if="info!={}">
              <h2 style="color:'#002B49'; font-weight:700;"> Disease: {{disease}} <span style="float:right; padding-right:2%; color:grey; font-weight:550">Probability: {{accuracy * 100}}%</span></h2>
              
            </div>
            <h3><span class="glyphicon glyphicon-chevron-right" style="margin-right:1%;margin-top:-8px; color:'#002B49'; font-weight:600;"/>Description :</h3>
             <h3> {{dinfo}} </h3>

                <div v-if="pinfo!=null" style="padding-top:3%;">
                <h3><span class="glyphicon glyphicon-chevron-right" style="margin-right:1%;margin-top:-8px;color:'#002B49'; font-weight:600;"/>Precautions</h3>
                <ul style="list-style-type:circle; font-size:20px;padding-left:3%;">
                          <li> {{pinfo.p1}}</li>
                          <li> {{pinfo.p2}}</li>
                          <li> {{pinfo.p3}}</li>
                          <li> {{pinfo.p4}}</li>
   </ul>
   </div>
          </Widget>

                </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// const automl = require('@google-cloud/automl');
// const fs = require('fs');
// const http = require('http');
// const url = require('url');

// Create client for prediction service.
import { VueCsvImport } from 'vue-csv-import';
import disc from './discription.json';
import pre from './precaution.json';
import Widget from "@/components/Widget/Widget";
import BigStat from "./components/BigStat/BigStat";
import mock from "./mock";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import { Chart } from "highcharts-vue";
import VueTaggableSelect from "./components/VueTaggableSelect.vue";
import RingLoader from "./components/RingLoader.vue";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    Widget,
    BigStat,
    highcharts: Chart,
    Autocomplete,
    VueTaggableSelect,
    RingLoader,
    VueCsvImport
  },
  props: {
    // This corresponds to v-model
    loding: false,
    value: {
      required: true
    },
    taggable: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
    disease:"",
    accuracy:"",
    pinfo:null,
    precaution:pre,
    discription: disc,
     dinfo :"",
      info: null,
      client: "",
      mock,
      Symptoms: null,
      submited: 1,
      id: [],
      sym: [
        "itching",
        "skin_rash",
        "nodal_skin_eruptions",
        "continuous_sneezing",
        "shivering",
        "chills",
        "joint_pain",
        "stomach_pain",
        "acidity",
        "ulcers_on_tongue",
        "muscle_wasting",
        "vomiting",
        "burning_micturition",
        "spotting_ urination",
        "fatigue",
        "weight_gain",
        "anxiety",
        "cold_hands_and_feets",
        "mood_swings",
        "weight_loss",
        "restlessness",
        "lethargy",
        "patches_in_throat",
        "irregular_sugar_level",
        "cough",
        "high_fever",
        "sunken_eyes",
        "breathlessness",
        "sweating",
        "dehydration",
        "indigestion",
        "headache",
        "yellowish_skin",
        "dark_urine",
        "nausea",
        "loss_of_appetite",
        "pain_behind_the_eyes",
        "back_pain",
        "constipation",
        "abdominal_pain",
        "diarrhoea",
        "mild_fever",
        "yellow_urine",
        "yellowing_of_eyes",
        "acute_liver_failure",
        "fluid_overload",
        "swelling_of_stomach",
        "swelled_lymph_nodes",
        "malaise",
        "blurred_and_distorted_vision",
        "phlegm",
        "throat_irritation",
        "redness_of_eyes",
        "sinus_pressure",
        "runny_nose",
        "congestion",
        "chest_pain",
        "weakness_in_limbs",
        "fast_heart_rate",
        "pain_during_bowel_movements",
        "pain_in_anal_region",
        "bloody_stool",
        "irritation_in_anus",
        "neck_pain",
        "dizziness",
        "cramps",
        "bruising",
        "obesity",
        "swollen_legs",
        "swollen_blood_vessels",
        "puffy_face_and_eyes",
        "enlarged_thyroid",
        "brittle_nails",
        "swollen_extremeties",
        "excessive_hunger",
        "extra_marital_contacts",
        "drying_and_tingling_lips",
        "slurred_speech",
        "knee_pain",
        "hip_joint_pain",
        "muscle_weakness",
        "stiff_neck",
        "swelling_joints",
        "movement_stiffness",
        "spinning_movements",
        "loss_of_balance",
        "unsteadiness",
        "weakness_of_one_body_side",
        "loss_of_smell",
        "bladder_discomfort",
        "foul_smell_of urine",
        "continuous_feel_of_urine",
        "passage_of_gases",
        "internal_itching",
        "toxic_look_(typhos)",
        "depression",
        "irritability",
        "muscle_pain",
        "altered_sensorium",
        "red_spots_over_body",
        "belly_pain",
        "abnormal_menstruation",
        "dischromic _patches",
        "watering_from_eyes",
        "increased_appetite",
        "polyuria",
        "family_history",
        "mucoid_sputum",
        "rusty_sputum",
        "lack_of_concentration",
        "visual_disturbances",
        "receiving_blood_transfusion",
        "receiving_unsterile_injections",
        "coma",
        "stomach_bleeding",
        "distention_of_abdomen",
        "history_of_alcohol_consumption",
        "fluid_overload.1",
        "blood_in_sputum",
        "prominent_veins_on_calf",
        "palpitations",
        "painful_walking",
        "pus_filled_pimples",
        "blackheads",
        "scurring",
        "skin_peeling",
        "silver_like_dusting",
        "small_dents_in_nails",
        "inflammatory_nails",
        "blister",
        "red_sore_around_nose",
        "yellow_crust_ooze"
      ],
      values: [],
      columnSpecIds: []
    };
  },
     mounted() {
      this.sendReq();
      // const dt = { data: { value: "gdfg1df2g2121dgfdg" }};
      // const request = axios.post(url, dt);
      var url = "http://localhost:5000/api/working";
      axios.get(url)
       	.then(response => {
         console.log(response.data)
         } )
    
    },
  methods: {
    async sendReq() {
      that.model = await tf.loadModel("model.json");
    },
    getRandomData() {
      const arr = [];
      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    result() {
      // this.$router.push('/app/result');
    },
    next() {
      this.submited = 2;
      let flag = false;
      let inputs = [];
      for (let i in this.sym) {
        for (let j in this.Symptoms) {
          if (this.sym[i] == this.Symptoms[j]) {
            flag = true;
          }
        }
        let obj = {};
        if (flag == true) {
          obj["stringValue"] = "1";
          flag = false;
        } else {
          obj["stringValue"] = "0";
        }
        inputs.push(obj);
      }
      var url = "http://localhost:5000/api/automl";
      axios.post(url, inputs).then(response => {
        this.info = response.data
        this.disease = this.info.disease
        this.accuracy =this.info.score.toFixed(2)
      
        for(var k in this.discription) {
            if (this.discription[k]['Disease'] == this.info.disease) {
                this.dinfo = this.discription[k]['Description']
            }
        }
        this.pinfo = {}
         for(var l in this.precaution) {
            if (this.precaution[l]['Disease'] == this.info.disease) {
                this.pinfo['p1'] = this.precaution[l]['Precaution_1']
                this.pinfo['p2'] = this.precaution[l]['Precaution_2']
                this.pinfo['p3'] = this.precaution[l]['Precaution_3']
                this.pinfo['p4'] = this.precaution[l]['Precaution_4']

            }
        }


        
              this.submited = 3;

        console.log("Col Id",this.info);
      }).catch(err=>{
          console.error(err)
      })
          
         


      // this.auth()
    },
 
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
