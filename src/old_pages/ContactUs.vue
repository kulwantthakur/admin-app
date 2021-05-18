<template>
<div>
       <div >
  <h5 align="center" style="margin-top:5%;">Contact Us</h5>
    </div>  
            <div  style="margin:auto;width:50%;">
            <label>First Name</label>
            <div class="try">
            <q-input 
              outlined 
              v-model.trim="$v.firstname.$model"
            />
            </div>
            <label>Last Name</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="lastname"
            />
            </div>
            <label>Email</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="email"
            />
            </div>
            <label>Phone</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="phone"
            />
            </div>

            <label>Company</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="company"
            />
            </div>
      

           
            <div class="row" style="margin-bottom:2%;">
            <div class="col-4">
            </div>
             <div class="col-4">
             <q-btn label="Submit" @click="invitecoach()" color="primary" />  
             
             </div>
            <div class="col-4">
            </div>
            </div>
            
           </div>
      </div>
 </template>
   <script>
import { required, email } from 'vuelidate/lib/validators'
import Vue from "vue";
 export default {
    data() {
      return {
          tab: "coach",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          licenses:"Athlete Licences",
          assistantcoach: "Peter Johns",
          isShowing: false,
          radiovalue: "",
          options: [
          'Coach',
           'Assistant'
      ],
      optionsarray: [
       'Peter Johns',
          'Emma Smith',
           'Alison Paul'
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
    company: {
      required
    },
    assistantcoach: {
      required
    }
      },
      methods: {
      invitecoach() {
        if(!this.$v.firstname.$invalid && !this.$v.lastname.$invalid && !this.$v.email.$invalid && !this.$v.phone.$invalid && !this.$v.company.$invalid) 
      {
        Vue.$toast.error("Submitted.",{position:"top-right"});
      }
      else
      {
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
</style>