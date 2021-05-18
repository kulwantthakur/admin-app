<template>
<div>
       <div >
  <h5 align="center" style="margin-top:5%;">Generate Password</h5>
    </div>  
            <div  style="margin:auto;width:50%;">
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
          newpassword: "",
          confirmnewpassword: "",
          coachid: ""
         
          }
          },

       validations: {
    newpassword: {
      required
    },
    confirmnewpassword: {
      required
    }
   
      },
   mounted() {
      
          var token = this.$route.params.token;

          axios
          .get(
          this.$API_URL + "checkheadcoaches"+'/'+token,
          {

          },
          {
          headers: {
          "Content-Type": "application/json"
          }
          }).then(response => {
           this.coachid = response.data.data.id;
           console.log(this.coachid);
           
          })
          .catch(error => {
          Vue.$toast.error("Invalid token. Please try again later.", {
          position: "top-right"});
               this.$router.push({path: '/'});
          });


      },


      methods: {
    
      submitdata() {
        if(!this.$v.newpassword.$invalid && !this.$v.confirmnewpassword.$invalid ) 
      {   

                    if(this.newpassword != this.confirmnewpassword)
                    {
                       Vue.$toast.error("Password confirmation does not match", {position: "top-right"});
                    }
                    else
                    {
                        axios.post(
                         this.$API_URL + "generatepassword",
                          {
          
                            password: this.newpassword,
                            task: 'headcoaches',
                            token: this.$route.params.token
                         },
                          {
                            headers: {
                              "Content-Type": "application/json"
                            }
                          }
                        )
                        .then(response => {

                            Vue.$toast.success("Password has been generated successfully.",{position:"top-right"});

                            this.$router.push({path: '/'});

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