<template>
<div>
       <div >
  <h5 align="center" style="margin-top:5%;">Edit Profile</h5>
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

              <div style="margin-bottom:2%;">
             <label>Gender *</label>
            <div class="try">
            <q-select 
            outlined
              v-model="gender" :options="genderoptions"
            />
            </div>
            <div v-if="submitted && !$v.gender.required" class="invalid-feedback">Gender is required</div>

             <label>Date of Birth *</label>
            <div class="try">
            <q-input 
            outlined
              v-model="dob"
            />
            </div>
            <div v-if="submitted && !$v.dob.required" class="invalid-feedback">Date Of Birth is required</div>

             <label>Height *</label>
            <div class="try">
            <q-input 
            outlined
              v-model="height"
            />
            </div>
            <div v-if="submitted && !$v.height.required" class="invalid-feedback">Height is required</div>

            <label>Mobile *</label>
            <div class="try">
            <q-input 
             outlined
              v-model="phone"
            />
            </div>
            <div v-if="submitted && !$v.phone.required" class="invalid-feedback">Mobile is required</div>

            <q-btn label="Submit" style="float: right;margin-top: 15px;" @click="submitdata()" color="primary" />
            </div>
             </template>
            <script>
import { required, email } from 'vuelidate/lib/validators'
import Vue from "vue";
import axios from "axios";
 export default {
    data() {
      return {
          firstname: "",
          lastname: "",
          email: "",
          gender: "",
          dob: "",
          height: "",
          phone: "",
            options: [],
      genderoptions: [
       'Male', 'Female'
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
     gender: {
      required
    },
     dob: {
      required
    },
     height: {
      required
    },
    phone: {
      required
    }
   
      },
    mounted() {

     
         this.getprofile();
          
      
    },
      methods: {
    getprofile(){
    axios
        .get(
          this.$API_URL + "getprofile"+'/'+localStorage.getItem("user_id"),
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {

            this.firstname = response.data.Data.firstname;
            this.lastname = response.data.Data.lastname;
            this.email = response.data.Data.email;
            this.gender = response.data.Data.gender;
            this.height = response.data.Data.height;
            this.phone = response.data.Data.phone;
            this.dob = response.data.Data.dob;
             //console.log(response.data)
            //alert(this.editedItem.competition_lift)
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        },

      submitdata() {
        if(!this.$v.firstname.$invalid && !this.$v.lastname.$invalid && !this.$v.email.$invalid && !this.$v.gender.$invalid && !this.$v.phone.$invalid && !this.$v.height.$invalid && !this.$v.dob.$invalid ) 
      {

       
        axios.post(
         this.$API_URL + "updateprofile",
          {
          
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            gender: this.gender,
            height: this.height,
            phone: this.phone,
            dob: this.dob,
            user_id: localStorage.getItem("user_id"),
                       



           
         },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Profile has been changed successfully.",{position:"top-right"});
            

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