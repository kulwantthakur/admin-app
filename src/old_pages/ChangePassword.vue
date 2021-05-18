<template>
<div>
       <div >
  <h5 align="center" style="margin-top:5%;">Change Password</h5>
    </div>  
            <div  style="margin:auto;width:50%;">
            <label>Old Password *</label>
            <div class="try">
            <q-input 
               type="password"
                filled 
              v-model="oldpassword"
            />
            </div>
            <div v-if="submitted && !$v.oldpassword.required" class="invalid-feedback">Old Password is required</div>
            <label>New Password *</label>
            <div class="try">
            <q-input 
             type="password"
                filled 
              v-model="newpassword"
            />
            </div>
            <div v-if="submitted && !$v.newpassword.required" class="invalid-feedback">New Password is required</div>
            <label>Confirm New Password *</label>
            <div class="try">
            <q-input 
              type="password"
                filled 
              v-model="confirmnewpassword"
            />
            </div>
            <div v-if="submitted && !$v.confirmnewpassword.required" class="invalid-feedback">Confirm New Password is required</div>

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
          
          oldpassword: "",
          newpassword: "",
          confirmnewpassword: "",
         
          }
          },

       validations: {
    oldpassword: {
      required
    },
    newpassword: {
      required
    },
    confirmnewpassword: {
      required
    }
   
      },
    mounted() {
      
    },
      methods: {
    
      submitdata() {
        if(!this.$v.oldpassword.$invalid && !this.$v.newpassword.$invalid && !this.$v.confirmnewpassword.$invalid ) 
      {

                    if(this.newpassword != this.confirmnewpassword)
                    {
                       Vue.$toast.error("Password confirmation does not match", {position: "top-right"});
                    }
                    else
                    {

                    axios.post(
                     this.$API_URL + "changepassword",
                      {
                      
                        current_password: this.oldpassword,
                        password: this.newpassword,
                        password_confirmation: this.confirmnewpassword,
                        user_id: localStorage.getItem("user_id"),
                       
                     },
                      {
                        headers: {
                          "Content-Type": "application/json"
                        }
                      }
                    )
                    .then(response => {

                        Vue.$toast.success("Password has been changed successfully.",{position:"top-right"});
                        

                        })
                    .catch(error => {
                        Vue.$toast.error("There has been some problem. Please try again later.", {
                          position: "top-right"
                        });
                    });

                }

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