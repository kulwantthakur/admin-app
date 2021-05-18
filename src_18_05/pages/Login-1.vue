<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model.trim="$v.username.$model"
                label="Username"
              />
              <q-input
                type="password"
                filled
                v-model.trim="$v.password.$model"
                label="Password"
              />

              <div class="flex justify-center">
                <q-btn label="Sign in" @click="reset" type="button" color="primary"/>
              </div>
              <div class="flex justify-center">
              <q-item to="/forgotpassword" class="q-ml-xl" style="margin:auto; display:block; background: none;" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Forgot Password</q-item-label>
            </q-item-section>
          </q-item>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
        <q-footer>
           <div class="flex justify-center">
              <a style="font-size:10px;text-decoration: underline;" @click="redirectopolicy();" href="#">Privacy Policy</a>
              <a style="font-size:12px;color:black;" href="#">|</a>
              <a style="font-size:10px;text-decoration: underline;" @click="redirectconditions();"href="#">Terms & Conditions</a>
              <a style="font-size:12px;color:black;" href="#">|</a>
              <a style="font-size:10px;text-decoration: underline;" @click="redirectcontact();"href="#">Contact Us</a>
              <a style="font-size:12px;color:black;" href="#">|</a>
              <a style="font-size:10px;text-decoration: underline;" href="/generatepassword/xap3rx0NOpWq5u">generate password</a>

              </div>
      </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import axios from "axios";
import Vue from "vue";
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  mounted() {
  //alert(localStorage.getItem("user_token"))
  if(localStorage.getItem("user_id") != 0 && localStorage.getItem("user_id") != "null" && localStorage.getItem("user_id") != null && localStorage.getItem("user_id") != "") {

  if(localStorage.getItem("role") == 'admin')
          {
            this.$router.push({path: '/Dashboard'});
          }
          else
          {
              Vue.$toast.error("You are not authorized to view this page", {
              position: "top-right"
            });
          }
       
  }
  },
        methods: {
        redirectopolicy(){
            this.$router.push({path: '/privacypolicy'});
        },
         redirectconditions(){
            this.$router.push({path: '/termsandconditions'});
        },
         redirectcontact(){
            this.$router.push({path: '/contactus'});
        },
          reset() {

        //  alert('popopopop');
            this.$v.username.$touch();
            this.$v.password.$touch();
            if(!this.$v.username.$invalid && !this.$v.password.$invalid) {
              axios
        .post(
          this.$API_URL + "login",
          {
            email:this.username,
            password:this.password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

    //    var myJSON = JSON.stringify(response);

      //  alert(myJSON);

          if(response.data.success.token){
          localStorage.setItem("user_token",response.data.success.token);
          localStorage.setItem("user_id",response.data.success.id);
          localStorage.setItem("role",response.data.success.role);

         /// alert(response.data.success.role);

          if(response.data.success.role == 'admin')
          {
            this.$router.push({path: '/Dashboard'});
          }
          else
          {
            Vue.$toast.error("You are not authorized to view this page", {
          position: "top-right"
          });
          }
          }
          else{
            Vue.$toast.error("Username Or Password is incorrect.",{position:"top-right"});
          }
        })
        .catch(error => {
            Vue.$toast.error("Username Or Password is incorrect.", {
              position: "top-right"
            });
        });
            }
            else{
               Vue.$toast.error("Username and Password is required.",{position:"top-right"});
            }
          }
        }
    }
</script>

<style>
.q-layout__section--marginal {
    background-color: white;
}
</style>
