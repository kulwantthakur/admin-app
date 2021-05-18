<template>
<div>
       <div>
  <h5 align="center" style="margin-top:5%;">Edit Coach</h5>
    </div>  
          <div  style="margin:auto;width:50%;">
            <label>First Name *</label>
                <div class="try">
                <q-input 
                  outlined 
                  v-model="first_name"
                />
                </div>
                <div v-if="submitted && !$v.first_name.required" class="invalid-feedback">First Name is required</div>

                  <label>Last Name *</label>
                  <div class="try">
                  <q-input 
                    outlined 
                    v-model="last_name"
                  />
                  </div>
                  <div v-if="submitted && !$v.last_name.required" class="invalid-feedback">Last Name is required</div>

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
                       <q-select outlined v-model="status" :options="coachesinputarray" />
                        </div>

                       <div class="row" style="margin-bottom:2%;">
                       <div class="col-4">
                        </div>

                  </div>
                  
                  </div>
           

       <q-btn label="Save" @click="updateRow" style="float: right;margin-top: 15px;position: relative; right: 262px;" color="primary" />
      
      </div>
 </template>
   <script>
import { required, email, numeric} from 'vuelidate/lib/validators'
import axios from "axios";
import Vue from "vue";

 export default {
    data() {
      return {
          status: "",
          data: [],
          first_name: '',
           last_name: "",
           email: "",
           phone: "",
           coachesinputarray: [
           'Active',
             'Archived',
               'Pending'
          
      ]
          
          }
          },
          validations: {
    first_name: {
      required
    },
    last_name: {
      required
    },
    email: {
      required, email
    },
    phone: {
      required, numeric
    },
      status: {
      required
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
            this.first_name = response.data.data.first_name;
            this.last_name = response.data.data.last_name;
            this.phone = response.data.data.phone;
            this.email = response.data.data.email;
            this.licenses = response.data.data.licenses;
            this.head_coach_id = response.data.data.head_coach_id;
            this.status = response.data.data.status;
            if(this.head_coach_id) {
                    this.isShowing = true;
            }
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      },
     methods:{
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
        updateRow() {
        if(!this.$v.first_name.$invalid && !this.$v.last_name.$invalid && !this.$v.email.$invalid && !this.$v.phone.$invalid) 
      {
        var id = this.$route.params.id;
        axios.put(
         this.$API_URL + "coach"+'/'+id,
          {
            
            first_name: this.first_name,
            last_name: this.last_name,
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

            Vue.$toast.success("Record updated successfully.",{position:"top-right"});
            this.$router.push({path: '/newcoaches'});

            })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        }
        else {
        this.submitted = true;
        Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
        }
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