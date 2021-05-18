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
          <q-tab name="foodinfo" label="Food Info" />
          <q-tab name="servings" label="Servings" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="foodinfo">
            <div>
            <h5 align="center" style="margin-top:0;">Edit Food Item</h5>
            <div class="q-pa-md">
            <q-form
              style="margin:0.7%;">
            <div class="row">
              <div class="col">
            <label>Food Name *</label>
            <div class="try">
              <q-input 
              outlined 
              v-model="food_name"
              />
            </div>
            <div v-if="submitted && !$v.food_name.required" class="invalid-feedback">Food Name is required</div>

            <label>Description Name *</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="others"
            />
            </div>
            <div v-if="submitted && !$v.others.required" class="invalid-feedback">Description Name is required</div>

               </div>
            <div class="col custom">
              <div class="trynew"> 
              <q-select outlined v-model="advanced_macro_category" :options="selectinput1array" />
              </div>
              <div v-if="submitted && (advanced_macro_category=='Food Category')" style="font-size:14px;" class="invalid-feedback">Advanced Macro Category Field is required</div>
              
              <div class="col custom">
               <div class="trynew">
              <label>Unit of Measure *</label>
              <q-select outlined v-model="dietary_fiber" :options="selectinput2array"  @input="setService_size"/>
              <div v-if="submitted && (dietary_fiber=='Unit of Measure')" style="font-size:14px;" class="invalid-feedback">Dietary Fiber is required</div>
              
              </div>
              </div>
              </div>
              </div>


            <p style="margin-top:16px;"><b>Macronutrients</b></p>
             <div class="row">
                      <div class="col">
                      <label>{{basic_proteins_label}} *</label>
                      <div class="try">
                        <q-input 
                        outlined 
                        type="number"
                        v-model="basic_proteins"
                        @input="calculateFormula"
                        />
                      </div>
                      <div v-if="submitted && !$v.basic_proteins.required" class="invalid-feedback">Proteins Field is required</div>
                      </div>

                      <div class="col">
                      <label>{{basic_fats_label}} *</label>
                        <div class="tryy">
                      <q-input 
                        outlined 
                         type="number"
                        v-model="basic_fats"
                        @input="calculateFormula"
                      />
                      </div>
                      <div v-if="submitted && !$v.basic_fats.required" class="invalid-feedback">Fats Field is required</div>
                      </div>
                     </div>
                 <div class="row">
                  <div class="col">
                  <label>{{basic_carbs_label}} *</label>
                <div class="try">
                <q-input 
                  outlined 
                   type="number"
                  v-model="basic_carbs" @input="calculateFormula"
                />
                </div>
                <div v-if="submitted && !$v.basic_carbs.required" class="invalid-feedback">Carbs Field is required</div>
                </div>

                <div class="col">
                <div class="tryy">{{basic_calories_label}}<q-input 
                  outlined 
                   type="number"
                     v-model="totalcalories" disable readonly /></div> 
                 </div>
                </div>
                <div class="row">
                  <div class="col-4">
                  </div>
                   </div>
                   <p style="margin-top:16px;"><b>Additional Info</b></p>

                     <div class="row">
                     <div class="col-6">
                        <label>{{basic_sodiuminfo_label}}</label>
                     <div class="try">
                       <q-input 
                       outlined 
                        type="number"
                       v-model="sodiuminfo"
                       />
                      </div>
                    </div>

                    <div class="col-6">
                   <label>Alcohol (Standard Drinks)</label>
                     <div class="try alcohol_field">
                      <q-input 
                        outlined 
                         type="number"
                        v-model="alcohol"
                        @input="calculateFormula"
                       />
                      </div>
                     </div>
                    </div>

                     <div class="row">
                    <div class="col-6">
                      <label>{{basic_dietfiber_label}}</label>
                        <div class="try">
                       <q-input 
                         outlined 
                          type="number"
                           v-model="dietfiber" 
                         />
                       </div>
                     </div>
                     </div>





                  
                  <div class="col-4 flex justify-center">
                    <q-btn label="Next" color="primary" @click=gotoservings() />
                  </div>
                  <div class="col-4">
                  </div>
                  </q-form>
                  </div>
                

              
              </div>
              </q-tab-panel>


          <q-tab-panel name="servings">
          <div>
            <div class="q-pa-md">
            <q-form>
            <div> 

            <div class="row" v-for="(servings, k) in servingArr" :key="k">
                  <div class="col">
                    <label>Serving Name *</label>
                    <div class="try">
                      <q-input 
                      outlined 
                      v-model="servings.service_name"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <label>{{basic_size_label}} *</label>
                    <div class="try50 flex justify-between">
                      <q-input 
                      outlined 
                       type="number"
                      v-model="servings.service_size"
                      />
                       <q-btn round color="blue" icon="add" @click="addItem(servings)"/>
                      <q-btn round color="red" icon="cancel" @click="deleteItem(k, servings)"/>
                    </div>
                  </div>
              </div>


              </div>
              </q-form>
              </div>
              </div>
               <q-btn label="Back" align="left" color="primary" @click=gotofoodinfo() />
           <q-btn label="Update" align="right" style="float:right; margin-right: 230px; width: 80px;" color="primary" @click=updateRow() />
          </q-tab-panel>


        </q-tab-panels>
      </q-card>
      </template>
      <script>
       import { required } from 'vuelidate/lib/validators'
       import axios from "axios";
       import Vue from "vue";
       export default {
       data() {
       return {
          basic_proteins_label: "Proteins/100g",
          basic_fats_label: "Fats/100g",
          basic_carbs_label: "Carbs/100g",
          basic_calories_label: "Calories/100g",         
          basic_sodiuminfo_label: "Sodium/100g",
          basic_dietfiber_label: "Dietary Fiber/100g",
          basic_size_label: "Serving Sizes/100g",
          submitted_secondtab : false,
          submitted : false,
          tab: "foodinfo",
          others: "",
          food_name: "",
          totalcalories:"",
          basic_proteins: "",
          basic_fats: "",
          basic_carbs: "",
          minerals: "",
          advanced_vitamins: "",
          advanced_fats: "",
          sodiuminfo: "",
          alcohol: "",
          dietfiber: "",
          advanced_macro_category: "Food Category",
          dietary_fiber: "100g",
          servingArr:[],
           selectinput1array: [
            'No Category',
            'HBV Protein',
             'Workout Carbs',
               'Free Veg',
          ],
           selectinput2array: [
            '100g',
             '100ml'
          ]

    }
  },
   validations: {
    others: {
      required
    },
    food_name: {
      required
    },
    advanced_macro_category: {
      required
    },
     dietary_fiber: {
      required
    },
     basic_proteins: {
      required
    },
     basic_fats: {
      required
    },
     basic_carbs: {
      required
    },
  },
  mounted() {
       var id = this.$route.params.id;
         axios
        .get(
          this.$API_URL + "food"+'/'+id,
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            this.others = response.data.Data.others;
            this.food_name = response.data.Data.food_name;
            this.advanced_macro_category = response.data.Data.advanced_macro_category;
            this.dietary_fiber = response.data.Data.dietary_fiber;
            this.basic_proteins = response.data.Data.basic_proteins;
            this.basic_fats = response.data.Data.basic_fats;
            this.basic_carbs = response.data.Data.basic_carbs;
            this.sodiuminfo = response.data.Data.sodiuminfo;
            this.alcohol = response.data.Data.alcohol;
            this.dietfiber = response.data.Data.dietfiber;
            var str = response.data.Data.service_name;
            var res = str.split(",");
            var i;

            for (i = 0; i < res.length; i++) 
            {
              var result = res[i].split(":");
              this.servingArr.push({"service_name": result[0],"service_size": result[1]})
            }


      if(this.dietary_fiber == '100ml')
      {
        this.basic_proteins_label = "Proteins/100ml";
        this.basic_fats_label = "Fats/100ml";
        this.basic_carbs_label = "Carbs/100ml";
        this.basic_calories_label = "Calories/100ml";
        this.basic_sodiuminfo_label = "Sodium/100ml";
        this.basic_dietfiber_label = "Dietary Fiber/100ml";
        this.basic_size_label = "Serving Sizes/100ml";

      }
      else
      {
        this.basic_proteins_label = "Proteins/100g";
        this.basic_fats_label = "Fats/100g";
        this.basic_carbs_label = "Carbs/100g";
        this.basic_calories_label = "Calories/100g";
        this.basic_sodiuminfo_label = "Sodium/100g";
        this.basic_dietfiber_label = "Dietary Fiber/100g";
        this.basic_size_label = "Serving Sizes/100g";
      }


    var basic_proteins = this.basic_proteins;
    var basic_carbs = this.basic_carbs;
    var basic_fats = this.basic_fats;
    var alcohol = this.alcohol;  


    if(basic_proteins != '' && basic_carbs != '' && basic_fats != '' && alcohol != '')
    {
      this.totalcalories = basic_proteins*4+basic_carbs*4+basic_fats*9+alcohol*70;
//  alert(this.totalcalories);
    } 

            
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      },
  methods:{

        setService_size() 
    {
    
      if(this.dietary_fiber == '100ml')
      {
        this.basic_proteins_label = "Proteins/100ml";
        this.basic_fats_label = "Fats/100ml";
        this.basic_carbs_label = "Carbs/100ml";
        this.basic_calories_label = "Calories/100ml";
        this.basic_sodiuminfo_label = "Sodium/100ml";
        this.basic_dietfiber_label = "Dietary Fiber/100ml";
        this.basic_size_label = "Serving Sizes/100ml";

      }
      else
      {
        this.basic_proteins_label = "Proteins/100g";
        this.basic_fats_label = "Fats/100g";
        this.basic_carbs_label = "Carbs/100g";
        this.basic_calories_label = "Calories/100g";
        this.basic_sodiuminfo_label = "Sodium/100g";
        this.basic_dietfiber_label = "Dietary Fiber/100g";
        this.basic_size_label = "Serving Sizes/100g";
      }
        this.servingArr.service_size = this.dietary_fiber;

    },
    updateRow() {
    if(!this.$v.food_name.$invalid && !this.$v.basic_proteins.$invalid && !this.$v.basic_carbs.$invalid && !this.$v.basic_fats.$invalid && this.service_size != '' && this.service_name != '')
      {
        var id = this.$route.params.id;
        axios.put(
         this.$API_URL + "food"+'/'+id,
          {
            food_name:this.food_name,
            service_name:this.servingArr,
            basic_proteins:this.basic_proteins,
            basic_carbs:this.basic_carbs,
            basic_fats:this.basic_fats,
            others:this.others,
            totalcalories:this.totalcalories,
            advanced_macro_category:this.advanced_macro_category,
            dietary_fiber:this.dietary_fiber,
            sodiuminfo:this.sodiuminfo,
            alcohol:this.alcohol,
            dietfiber:this.dietfiber
         },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
            Vue.$toast.success("Record updated successfully.",{position:"top-right"});
            this.$router.push({path: '/food'});

            })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        }
        else {
        this.submitted = true;
        this.submitted_secondtab = true;
        Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
        }
    },
    gotoservings() {
        if(!this.$v.food_name.$invalid  && !this.$v.others.$invalid && !this.$v.basic_proteins.$invalid && !this.$v.basic_carbs.$invalid && !this.$v.basic_fats.$invalid && this.service_size != '' && this.service_name != '')
        {
          this.tab= "servings";
        }
        else {
        this.submitted_secondtab = true;
        Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
        }
    },
    gotonutritionalinfo() {
    if(!this.$v.food_name.$invalid && !this.$v.others.$invalid && !this.$v.basic_proteins.$invalid && !this.$v.basic_carbs.$invalid && !this.$v.basic_fats.$invalid) 
      {
        this.tab= "nutritionalinfo";
        }
        else {
        this.submitted = true;
        Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
        }
    },
    addItem(){
      var my_object = {
        service_name:'',
        service_size:''
      };
      this.servingArr.push(my_object)

    },

    calculateFormula()
    {
      var basic_proteins = this.basic_proteins;
      var basic_carbs = this.basic_carbs;
      var basic_fats = this.basic_fats;
      var alcohol = this.alcohol;  
      if(basic_proteins != '' && basic_carbs != '' && basic_fats != '' && alcohol == '')
      {
      this.totalcalories = basic_proteins*4+basic_carbs*4+basic_fats*9;
      }
      else if(basic_proteins != '' && basic_carbs != '' && basic_fats != '' && alcohol != '')
      {
      this.totalcalories = basic_proteins*4+basic_carbs*4+basic_fats*9+alcohol*70;
      } 
    },

    deleteItem(index, item) {
            var idx = this.servingArr.indexOf(item);
            console.log(idx, index);
            if (idx > 0) {
                this.servingArr.splice(idx, 1);
            }

    },
    gotofoodinfo() {
      this.tab= "foodinfo";
    }
  }
}
</script>
<style>
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
.try {
    
    height: 35px;
    max-width: 95%;
    margin-bottom:3%;
}
.try .q-field__control {
    
    height: 35px;
    max-width: 95%;
    margin-bottom:3%;
}
.try50 {
    
    height: 35px;
    max-width: 60%;
    margin-bottom:3%;
}
.try50 .q-field__control {
    
    height: 35px;
    margin-bottom:3%;
}

.tryy {
    
    height: 35px;
    margin-bottom:3%;
}
.tryy .q-field__control {
    
    height: 35px;
    margin-bottom:3%;
}
.trynew .q-field--auto-height .q-field__control,.trynew .q-field--auto-height .q-field__native {
    height: 40px;
}
.tryunit {
  height:30px;
  justify-content: space-around;
  margin-top: 15px;
}
.q-select--without-input .q-field__control {
    cursor: pointer;
    height: 0px !important;
}
.q-field--auto-height .q-field__control {
    height: 33px !important;
}
.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
     min-height: 0px; 
}
.col.custom {
    margin-top: 20px;
}
.q-field__marginal {
    height: 30px;
    color: rgba(0,0,0,0.54);
    font-size: 24px;
}
.custom {
    font-size: 14px;
}
.customfont {
    font-size: 23px;
}

</style>