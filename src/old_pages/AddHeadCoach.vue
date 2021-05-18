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
  <h5 align="center" style="margin-top:0;">Add A New Company</h5>
      
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
      v-model="company_name"
      />
    </div>
    <div v-if="submitted && !$v.company_name.required" class="invalid-feedback">Business Name is required</div>

    <label>Website *</label>
    <div class="try">
    <q-input 
      outlined 
      v-model="website"
    />
    </div>
    <div v-if="submitted && !$v.website.required" class="invalid-feedback">Website is required</div>

      <label>Company Number *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="work_number"
      />
      </div>
      <div v-if="submitted && !$v.work_number.required" class="invalid-feedback">Company Number is required</div>
  <label>Email *</label>
  <div class="try">
 <q-input 
      outlined 
      v-model="email"
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
      v-model="contact_name"
      />
    </div>
    <div v-if="submitted && !$v.contact_name.required" class="invalid-feedback">Contact Name is required</div>

      <label>Mobile *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="contact_mobile"
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
      v-model="address"
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
      v-model="state"
      />
      </div>
      <div v-if="submitted && !$v.state.required" class="invalid-feedback">State is required</div>
    </div>
    <div class="col-5">
      <label>Post Code *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="post_code"
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
      v-model="country"
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
      type="number"
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
      v-model="contact_phonenuumber"
      />
       </div>
       <div v-if="submitted && !$v.contact_phonenuumber.required" class="invalid-feedback">Phone is required</div>

           <label>Email *</label>
      <div class="try">
      <q-input 
      outlined 
      v-model="contact_email"
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
            <q-select outlined v-model="assistant_licences" :options="assistantcoacharray"/>
            </div>
             <div style="width:70%;margin-left:10%;" v-if="submitted_secondtab && (this.assistant_licences == 'Please select')" class="invalid-feedback">Assistant Coach Licences is required</div>

            <div  style="margin-top:3%;width:70%;margin-left:10%;">
            <label>Athlete Licences *</label>
            <q-select outlined v-model="athlete_licences" :options="athletelicensearray"/>
            </div>
            <div style="width:70%;margin-left:10%;" v-if="submitted_secondtab && (this.athlete_licences == 'Please select')" class="invalid-feedback">Athlete Licences is required</div>
           
        <div style="width: 70%;margin-top:3%;margin-left:10%;">   
        <q-btn label="Back" color="primary" @click=callheadcoach() />  
        <q-btn style="float:right;" label="Next" color="primary" @click=gotothemevalid() />
        </div>
          </q-tab-panel>
          <q-tab-panel name="theme">

 <div style="margin-top:3%;width:70%;margin-left:10%;">
 <form enctype="multipart/form-data">
            <div style="margin-top:3%;width:70%;margin-left:10%;">
            <label>Upload Logo *</label>
            <br />
            <input type="file" class="form-control" required v-on:change="onChange">
              <div v-if="submitted_thirdtab && !$v.logo.required" class="invalid-feedback">Upload Logo is required</div>
            </div>

            <div  style="margin-top:3%;width:70%;margin-left:10%;">
              <label>Upload Image *</label>
              <br />
              <input type="file" class="form-control" required v-on:change="onChange1">
            <div v-if="submitted_thirdtab && !$v.photo.required" class="invalid-feedback">Upload Image is required</div>
            </div>
                      
        <div style="width: 70%;margin-top:3%;margin-left:10%;">
              
        <q-btn label="Back" color="primary" @click=gotolicencing() />  
           <!--button style="border: none;
    border-radius: 5px;float:right;padding: 6px 12px 6px 12px;margin: 5px;background:#363636!important;color: #fff!important;" color="primary">Save</button-->
            
        <q-btn style="float:right;" label="Save" color="primary" @click=finalsave() />
          </form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      </template>
      <script>
import { required, email, numeric} from 'vuelidate/lib/validators'
import axios from "axios";
import Vue from "vue";
  export default {
    data() {
      return {
        seletedImage: {
          headerImage: ""
        },
       name: '',
                file: '',
                success: '',
      validate: {
        validHeaderImageorVideo: true,
        validvideoBgURL: true,
        validExtraTerms: true,
        validEditorDT: true,
        validURLFormate: true
      },
      editprofile: {
        croppedHeaderImage: new FormData(),
        headerVideoUrl: "",
        headerImage: ""
      },
      headerImageFileUrl: "",
      headerImageThumbnailUrl: "",
      headerImage: "",
      img: "",
      termsText: "",
      rewardsFinalImage: [],
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
        required, numeric
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
        required, email
        },
      abn: {
        required
        },
     contact_phonenuumber: {
        required, numeric
        },
      contact_email: {
        required, email
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
  methods: {
   
   onChange(e) {
            this.logo = e.target.files[0];
        },

      onChange1(e) {
            this.photo = e.target.files[0];
        },
   finalsave(e) {

    if(!this.$v.country.$invalid && !this.$v.state.$invalid && !this.$v.post_code.$invalid && !this.$v.company_name.$invalid && !this.$v.website.$invalid && !this.$v.work_number.$invalid && !this.$v.contact_name.$invalid && !this.$v.contact_mobile.$invalid && !this.$v.address.$invalid && !this.$v.email.$invalid && !this.$v.abn.$invalid && !this.$v.contact_phonenuumber.$invalid && !this.$v.contact_email.$invalid && this.athlete_licences != 'Please select' && this.assistant_licences != 'Please select' && this.abn.length == 10 && this.logo != '' && this.photo != '') 
     {

            let data = new FormData();
            data.append('logo', this.logo);
            data.append('photo', this.photo);
            data.append('website', this.website);
            data.append('company_name', this.company_name);
            data.append('address', this.address);
            data.append('email', this.email);
            data.append('work_number', this.work_number);
            data.append('abn', this.abn);
            data.append('state', this.state);
            data.append('post_code', this.post_code);
            data.append('country', this.country);
            data.append('contact_name', this.contact_name);
            data.append('contact_mobile', this.contact_mobile);
            data.append('contact_email', this.contact_email);
            data.append('contact_phonenuumber', this.contact_phonenuumber);
            data.append('assistant_licences', this.assistant_licences);
            data.append('athlete_licences', this.athlete_licences)

            


       axios
        .post(
          this.$API_URL+"headcoaches", data,{
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
            Vue.$toast.success("A new head coach is added successfully.",{position:"top-right"});
            this.$router.push({path: '/headcoaches'});

             
        })
      }
      else {
         this.submitted = true;
            this.submitted_secondtab = true;
            this.submitted_thirdtab = true;
         Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
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
    
}
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
</style>