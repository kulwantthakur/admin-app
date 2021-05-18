<template>
<div>
       <div >
  <h5 align="center" style="margin-top:5%;">Add A New Coach</h5>
    </div>  
            <div  style="margin:auto;width:50%;">
            <label>First Name *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="firstname"
            />
            </div>
            <div v-if="submitted && !$v.firstname.required" class="invalid-feedback">First Name is required</div>
            <label>Last Name *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="lastname"
            />
            </div>
            <div v-if="submitted && !$v.lastname.required" class="invalid-feedback">Last Name is required</div>
            <label>Email *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="email"
            />
            </div>
            <div v-if="submitted && !$v.email.required" class="invalid-feedback">Email is required</div>
            <label>Phone *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="phone"
            />
            </div>
            <div v-if="submitted && !$v.phone.required" class="invalid-feedback">Phone is required</div>
            <div style="margin-bottom:2%;">
            <label>Status *</label>
            <q-select outlined v-model="status" :options="statusoptions" />
            <label>Licences *</label>
            <q-select outlined v-model="licenses" :options="options" />
            <div v-if="submitted && licenses=='Athlete Licences'" class="invalid-feedback">Licences Field is required</div>
            <label>Migrate an Assistant Coach</label>
            <q-radio size="xs" v-model="radiovalue" val="yes" label="Yes" @input="showselect()" />
            <q-radio size="xs" v-model="radiovalue" val="no" label="No" @input="hideselect()" />
            </div>
            <div style="margin-bottom:2%;" v-show="isShowing">
                <label>Assistant Coach *</label>
                <div><select
            v-model="assistantcoach"
            class="input"
            style="width:100%;border-radius: 5px;
    height: 55px;"
          >
            <option value="">Select Head Coach</option>
            <option
              v-for="item in data"
              :key="item.id"
              :value="item.id"
            >
              {{ item.contact_name }}</option
            >
          </select>
          </div>
                
            </div>
            <div class="row" style="margin-bottom:2%;">
            <div class="col-4">
            </div>
             <div class="col-4">
             <q-btn label="+ Invite" color="primary" @click="invitecoach()" />  
             
             </div>
          <div class="col-4">
            </div>
            </div>
            <p style="width:65%;margin:auto;">This action will send user an invitation email</p>
           </div>
      </div>
 </template>
   <script>
import { required, email } from 'vuelidate/lib/validators'
import Vue from "vue";
import axios from "axios";
 export default {
    data() {
      return {
          status: "Select Status",
          data: [],
          submitted: false,
          tab: "coach",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          licenses:"Athlete Licences",
          assistantcoach: "",
          isShowing: false,
          radiovalue: "",
          options: [
           '1',
           '2',
           '3',
           '4',
           '5',
           '6',
           '7',
           '8',
           '9',
           '10',
           '11',
           '12',
           '13',
           '14',
           '15',
           '16',
           '17',
           '18',
           '19',
           '20',
           '21',
           '22',
           '23',
           '24',
           '25'
      ],
      optionsarray: [],
      statusoptions: [
       'Active', 'Inactive'
      ]
          }
          },
       validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    email: {
      required, email
    },
    phone: {
      required
    },
    licenses: {
      required
    },
    
    status: {
      required
    }
      },
    mounted() {
      this.getallheadcoaches();
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
      invitecoach() {
        if(!this.$v.firstname.$invalid && !this.$v.lastname.$invalid && !this.$v.email.$invalid && !this.$v.phone.$invalid && this.licenses != 'Athlete Licences' && this.status != 'Select Status' ) 
      {
        axios.post(
         this.$API_URL + "coach",
          {
          
            first_name: this.firstname,
            last_name: this.lastname,
            email: this.email,
            phone: this.phone,
            licenses: this.licenses,
            head_coach_id: this.assistantcoach,
            status: this.status
        
         },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record added successfully.",{position:"top-right"});
            this.$router.push({path: '/allcoaches'});

            })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      }
      else
      {  
         this.submitted = true;
         Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
      }
      },
      showselect() {
      this.isShowing = true;
      },
      hideselect() {
      this.isShowing = false;
      }
      }
          }
          </script>
<style>
.try .q-field__control, select {
    
    height: 50px;
    margin-bottom:3%;
}
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
</style>