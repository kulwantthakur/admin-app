<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Forgot Password
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model.trim="recoveryemail"
                label="Email"
              />
              

              <div class="flex justify-center">
                <q-btn label="Send Link to recover Password" @click="reset" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script> 

import { required, email } from 'vuelidate/lib/validators'
import Vue from "vue";
import axios from "axios";

    export default {
        data() {
            return {
                recoveryemail: ''
            }
        },
        validations: {
    recoveryemail: {
      required,email
    }
  },

   mounted() {

      
    }, 

        methods: {
          reset() {
            if(!this.$v.recoveryemail.$invalid) {
                    axios.post(
                     this.$API_URL + "forgotPassword",
                      {
                        email: this.recoveryemail,                      
                      },
                      {
                        headers: {
                          "Content-Type": "application/json"
                        }
                      }
                    )
                    .then(response => {
                          Vue.$toast.success("Reset password link sent successfully.",{position:"top-right"});
                          this.$router.push({path: '/'});
                        })
                    .catch(error => {
                          Vue.$toast.error("Incorrect Email. Please try again later.", {
                          position: "top-right"
                        });
                    });


            }
            else{

               Vue.$toast.error("Email is incorrect.",{position:"top-right"});
            }
  
        
        }
    }
}
</script>

<style>

  
</style>
