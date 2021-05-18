<template>
<div>
       <div>
       <q-btn style="margin: 3% 0 0 5%;" label="Go Back" color="primary" @click="gotoallcoachespage()" />
  <h5 align="center" style="margin-top:5%;">View Coach</h5>
       </div>  
            <div  style="margin:auto;width:50%;">
            <label>First Name *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="editedItem.first_name"
              disable readonly
            />
            </div>
            <label>Last Name *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="editedItem.last_name"
              disable readonly
            />
            </div>
            <label>Email *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="editedItem.email"
              disable readonly
            />
            </div>
            <label>Phone *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="editedItem.phone"
              disable readonly
            />
            </div>
          
            <div style="margin-bottom:2%;">
            <label>Licences *</label>
            <q-select outlined v-model="editedItem.licenses" :options="options" disable readonly/>
           <label>Assistant Coach *</label>
             <div class="try">
            <q-input 
              outlined 
              v-show="isShowing"
              v-model="editedItem.head_coach_id"
              disable readonly
            />
            </div>
             
            
           
            </div>
           </div>
      </div>
      </div>
 </template>
   <script>
const defaultItem = {
           first_name: '',
           last_name: "",
           email: "",
           phone: "",
           number_of_clients:"",
           head_coach_id: "",
           radiovalue: "",
           status: ""
      }
import axios from "axios";
import Vue from "vue";
 export default {
    data() {
      return {

          data: [],
          editedItem: defaultItem,
          isShowing: false,
          tab: "coach",
          options: [
          '1',
           '2'
      ],
      optionsarray: []
          }
          },
      mounted() {
      this.getallheadcoaches();
       var id = this.$route.params.id;
         axios
        .get(
          this.$API_URL + "coach"+'/'+id,
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            console.log(response.data.data);
            this.editedItem = response.data.data;
            if(this.editedItem.head_coach_id) {
                    this.isShowing = true;
            }
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      },
      methods: {
      getallheadcoaches(){
         axios
        .get(
          this.$API_URL + "headcoaches",
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            this.data = response.data.data;
            console.log(this.data);
            
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        },
      gotoallcoachespage() {
      this.$router.push({ path: `/allcoaches` });
      }
      }
          }
          </script>
<style>
.try .q-field__control {
    
    height: 50px;
    margin-bottom:3%;
}
</style>