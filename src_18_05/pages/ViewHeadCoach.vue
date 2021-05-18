<template>
<q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="business" label="Head Coach" />
          <q-tab name="licencing" label="Licencing" />
          <q-tab name="theme" label="Theme" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="business">
            <div >
  <h5 align="center" style="margin-top:0;">View Head Coach</h5>
      
          <div class="q-pa-md">

  <q-form
      style="margin:0 7%;">

      <div class="row">
        <div class="col-12">
           <p style="margin-top:16px;"><b>Business Details</b></p>
        </div>
      </div>

    <div class="row q-gutter-lg">
      <div class="col">
    <label>Business Name *</label>
    <div class="try">
      <q-input 
      outlined 
      v-model="company_name" disable readonly
      />
    </div>
    <div v-if="submitted && !$v.company_name.required" class="invalid-feedback">Business Name is required</div>

    <label>Website *</label>
    <div class="try">
    <q-input 
      outlined 
      v-model="website" disable readonly
    />
    </div>
    <div v-if="submitted && !$v.website.required" class="invalid-feedback">Website is required</div>

      <label>Company Number *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="work_number" disable readonly
      />
      </div>
      <div v-if="submitted && !$v.work_number.required" class="invalid-feedback">Company Number is required</div>
  <label>Email *</label>
  <div class="try">
 <q-input 
      outlined 
      v-model="email" disable readonly
      />
       </div>
       <div v-if="submitted && !$v.email.required" class="invalid-feedback">Email is required</div>

        <div class="row">
    <div class="col-12">
       <p style="margin-top:16px;"><b>Head Coach Details</b></p>
    </div>
 </div>
 <label>Contact Name *</label>
    <div class="try">
      <q-input 
      outlined 
      v-model="contact_name" disable readonly
      />
    </div>
    <div v-if="submitted && !$v.contact_name.required" class="invalid-feedback">Contact Name is required</div>

      <label>Mobile *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="contact_mobile" disable readonly
      />
     </div>
     <div v-if="submitted && !$v.contact_mobile.required" class="invalid-feedback">Mobile is required</div>

</div>
<div class="col">

 <div class="row">
    <div class="col-12">
  <label>Address *</label>
  <div class="try">
  <q-input 
      outlined 
      v-model="address" disable readonly
      />
      </div>
      <div v-if="submitted && !$v.address.required" class="invalid-feedback">Address is required</div>
    </div>
 </div>


 <div class="row">
    <div class="col-5">
      <label>State *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="state" disable readonly
      />
      </div>
      <div v-if="submitted && !$v.state.required" class="invalid-feedback">State is required</div>
    </div>
    <div class="col-5">
      <label>Post Code *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="post_code" disable readonly
      />
      </div>
      <div v-if="submitted && !$v.post_code.required" class="invalid-feedback">Post Code is required</div>
    </div>
 </div>


 <div class="row">
    <div class="col-5">
      <label>Country *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="country" disable readonly
      />
      </div>
      <div v-if="submitted && !$v.country.required" class="invalid-feedback">Country is required</div>
    </div>
    <div class="col-5">
    </div>
 </div>

  <label>ACN/ABN *</label>
  <div class="try">
  <q-input 
      outlined 
      v-model="abn"
      type="number" disable readonly
      :rules="[ val => val.length == 10 || 'Please use 10 digit value']"
      />
       </div>
       <div v-if="submitted && !$v.abn.required" class="invalid-feedback">ACN/ABN is required</div>

    <div class="row" style="padding: 6px;">
    <div class="col-12">&nbsp;</div>
    </div>

  <label>Phone *</label>
  <div class="try">
 <q-input 
      outlined 
      v-model="contact_phonenuumber" disable readonly
      />
       </div>
       <div v-if="submitted && !$v.contact_phonenuumber.required" class="invalid-feedback">Phone is required</div>

           <label>Email *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="contact_email" disable readonly
      />
      </div>  
      <div v-if="submitted && !$v.contact_email.required" class="invalid-feedback">Email is required</div>

       <div align="right" style="width: 70%;">
       <br />
        <q-btn label="Next" color="primary" @click=gotolicencingvalid() />
      </div>
       </div>
  
 </div>
      
    </q-form>

  </div>
   
      </div>
          </q-tab-panel>


          <q-tab-panel name="licencing">
            <div style="margin-top:3%;width:70%;margin-left:10%;">
            <label>Assistant Coach Licences *</label>
            <q-select outlined v-model="assistant_licences" :options="assistantcoacharray" disable readonly/>
            </div>
            <div style="width:70%;margin-left:10%;" v-if="submitted_secondtab && (this.assistant_licences == 'Please select')" class="invalid-feedback">Assistant Coach Licences is required</div>
            <div  style="margin-top:3%;width:70%;margin-left:10%;">
            <label>Athlete Licences *</label>
            <q-select outlined v-model="athlete_licences" :options="athletelicensearray" disable readonly/>
            </div>
           <div style="width:70%;margin-left:10%;" v-if="submitted_secondtab && (this.athlete_licences == 'Please select')" class="invalid-feedback">Athlete Licences is required</div>

        <div style="width: 70%;margin-top:3%;margin-left:10%;">   
        <q-btn label="Back" color="primary" @click=callheadcoach() />  
        <q-btn style="float:right;" label="Next" color="primary" @click=gotothemevalid() />
        </div>
          </q-tab-panel>
          <q-tab-panel name="theme">

           <form enctype="multipart/form-data">
            <div style="margin-top:3%;width:70%;margin-left:10%;">
            <label>Upload Logo *</label>
            <br />
            <input type="file" class="form-control" required v-on:change="onChange">
              <div v-if="submitted_thirdtab && !$v.logo.required" class="invalid-feedback">Upload Logo is required</div>
              <br />
              <img v-bind:src="this.logo" width="160px" height="140px" alt=""/>
            </div>
            <div  style="margin-top:3%;width:70%;margin-left:10%;">
              <label>Upload Image *</label>
              <br />
              <input type="file" class="form-control" required v-on:change="onChange1">
              <div v-if="submitted_thirdtab && !$v.photo.required" class="invalid-feedback">Upload Image is required</div>
              <br />
              <img v-bind:src="this.photo" width="160px" height="140px" alt=""/>
            </div>
                      
        <div style="width: 70%;margin-top:3%;margin-left:10%;">
              
        <q-btn label="Back" color="primary" @click=gotolicencing() />  
    
      </div>
          </form>
 
            
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </template>
      <script>
import { required, email } from 'vuelidate/lib/validators'
import axios from "axios";
import Vue from "vue";
  export default {
    data() {
      return {
         submitted: false,
          submitted_secondtab: false,
          submitted_thirdtab: false,
            file_path : null,
          tab: "business",
          company_name: "",
          state: "",
          post_code: "",
          country: "",
          website: "",
          work_number: "",
          address: "",
          email: "",
          abn: "",
          contact_name: "",
          contact_mobile: "",
          contact_email: "",
          contact_phonenuumber: "",
          assistant_licences: "Please select",
          athlete_licences: "Please select",
          logo: "",
          photo: "",
          uploadlogo: "",
          uploadphoto: "",
          assistantcoacharray: [
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
           athletelicensearray: [
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
          ]
    }
  },
  validations: {
      company_name: {
        required
        },
         website: {
        required
        },

       work_number: {
        required
        },

       contact_name: {
        required
        },

      contact_mobile: {
        required
        },

      state: {
        required
        },

      post_code: {
        required
        },
      country: {
        required
        },  
      address: {
        required
        },

      email: {
        required
        },

      abn: {
        required
        },

     contact_phonenuumber: {
        required
        },
      contact_email: {
        required
        },
      assistant_licences: {
        required
        },
      athlete_licences: {
        required
        },
      logo: {
        required
        },
      photo: {
        required
        }
      },
   mounted() {
      
       var id = this.$route.params.id;
         axios
        .get(
          this.$API_URL + "headcoaches"+'/'+id,
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            console.log(response.data);
            this.company_name = response.data.data.company_name;
            this.website = response.data.data.website;
            this.work_number = response.data.data.work_number;
            this.contact_name = response.data.data.contact_name;
            this.contact_mobile = response.data.data.contact_mobile;
            this.address = response.data.data.address;
            this.email = response.data.data.email;
            this.abn = response.data.data.abn;
            this.contact_phonenuumber = response.data.data.phone;
            this.assistant_licences = response.data.data.assistant_licences;
            this.athlete_licences = response.data.data.athlete_licences;

 
            this.state = response.data.data.state;
            this.post_code = response.data.data.post_code;
            this.country = response.data.data.country;
            this.contact_email = response.data.data.contact_email;


            this.logo = 'http://143.198.102.185:8080/uploads/'+response.data.data.logo;
            this.photo = 'http://143.198.102.185:8080/uploads/'+response.data.data.photo;
            
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      },
  methods: {

    onChange(e) {
            if(e.target.files[0])
            {
             this.uploadlogo = e.target.files[0];
            }
        
        },

    onChange1(e) {
            if(e.target.files[0])
            {
               this.uploadphoto = e.target.files[0];
            }
        },

    callheadcoach() {
      this.tab= "business";
    },
    gotolicencingvalid() {
      if(!this.$v.country.$invalid && !this.$v.state.$invalid && !this.$v.post_code.$invalid && !this.$v.company_name.$invalid && !this.$v.website.$invalid && !this.$v.work_number.$invalid && !this.$v.contact_name.$invalid && !this.$v.contact_mobile.$invalid && !this.$v.address.$invalid && !this.$v.email.$invalid && !this.$v.abn.$invalid && !this.$v.contact_phonenuumber.$invalid && !this.$v.contact_email.$invalid && this.abn.length == 10) 
     {
        this.tab= "licencing";
        }
      else {
         this.submitted = true;
         Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
      }
      
    },
    gotothemevalid() {
    if(this.assistant_licences != "Please select" && this.athlete_licences != "Please select")  
      {
        this.tab= "theme";
      }
      else {
         this.submitted_secondtab = true;
         Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
      }
    },
    gotolicencing() {
      this.tab= "licencing";
    },
    gotobusiness() {
      this.tab= "business";
    }
  }
}
</script>
<style>
.try .q-field__control {
    
    height: 35px;
    max-width: 70%;
    margin-bottom:3%;
}
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
</style>