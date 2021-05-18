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
                  <div class="col-4"> </div>
                <div v-if="submitted && !$v.phone.required" class="invalid-feedback">Phone is required</div>
                <div class="col-4"> </div>

                 <div style="margin-bottom:2%;">
                 <label>Status *</label>
                 <q-select outlined v-model="status" :options="coachesinputarray" />
                 </div>
                 <div class="row" style="margin-bottom:2%;">
                 <div class="col-4">
                 </div>

                 <div class="col-4">
                 <q-btn label="+ Invite" color="primary" @click="invitecoach()" />  
                 </div>
                 <div class="col-4"> </div>
                 <p style="width:65%;margin:auto;">This action will send user an invitation email</p>
                  </div>

              <div class="col-4" v-else>
                   You are authrised to create only {{total_authorised_coach}} coaches
               </div>
      
        </div>

 </template>
   <script>
import { required, email, numeric} from 'vuelidate/lib/validators'
import Vue from "vue";
import axios from "axios";
 export default {
    data() {
      return {
         
          data: [],
            status: "",
            tab: "coach",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            total_assistant_licences: '',
            total_authorised_coach: '',
              coachesinputarray: [
           'Active',
             'Archived',
               'Pending'
          
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
      required, numeric
    }
    
      },
    mounted() {
      this.getMycoaches();
    },
      methods: {
      getMycoaches(){
             var user_id = localStorage.getItem("user_id");
         axios
        .get(
          this.$API_URL+"mycoach/"+user_id,
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
              var resArr = response.data.data;
              if(resArr.length >=response.data.assistant_licences)
              {
                 this.total_assistant_licences = 1;
                 this.total_authorised_coach = response.data.assistant_licences;
              } 
              else
              {
                this.total_assistant_licences = '';
              }   
              // alert(this.total_assistant_licences);       
        })
        },
      invitecoach() {
        if(!this.$v.firstname.$invalid && !this.$v.lastname.$invalid && !this.$v.email.$invalid && !this.$v.phone.$invalid) 
      {
       var user_id = localStorage.getItem("user_id");
        axios.post(
         this.$API_URL + "coach",
          {
          
            first_name: this.firstname,
            last_name: this.lastname,
            email: this.email,
            phone: this.phone,
            status: this.status,
            head_coach_id: localStorage.getItem("user_id"),
        
         },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record added successfully.",{position:"top-right"});
            this.$router.push({path: '/newcoaches'});

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
    .try .q-field__control {

    height: 50px;
    margin-bottom:3%;
}
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
</style>