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
      <q-tab name="nutritionalinfo" label="Nutritional Info" />
      <q-tab name="servings" label="Servings" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="foodinfo">
        <div>
          <h5 align="center" style="margin-top: 0">View Food Item</h5>
          <div class="q-pa-md">
            <q-form style="margin: 0 7%">
              <div class="row">
                <div class="col">
                  <label>Food Name *</label>
                  <div class="try">
                    <q-input outlined v-model="food_name" disable readonly />
                  </div>
                  <label>Description Name *</label>
                  <div class="try">
                    <q-input outlined v-model="others" disable readonly />
                  </div>
                </div>

                <div class="col custom">
                  <div class="try">
                    <q-select
                      outlined
                      v-model="advanced_macro_category"
                      disable
                      readonly
                    />
                  </div>

                  <div class="try">
                    <label>Unit of Measure *</label>
                    <q-select
                      outlined
                      v-model="dietary_fiber"
                      disable
                      readonly
                    />
                  </div>
                </div>
              </div>
<p style="margin-top:16px;"><b>Macronutrients</b></p>
              <div class="row">
             
                <div class="col">
                <label>Proteins/100g *</label>
                <div class="try">
                  <q-input 
                  outlined 
                  v-model="basic_protein"
                  disable readonly
                  />
                </div>
                </div>

                <div class="col">
                <label>Fats/100g *</label>
                  <div class="try">
                <q-input 
                  outlined 
                  v-model="basic_fats"
                  disable readonly
                />
                </div>
                </div>
                 </div>

                 <div class="row">
                  <div class="col">
                  <label>Carbs/100g *</label>
                <div class="try">
                <q-input 
                  outlined 
                  v-model="basic_carbs"
                  disable readonly
                />
                 </div>
                    </div>

                <div class="col">
                <div class="try">Calories/100g<q-input 
                  outlined 
                   type="number"
                     v-model="totalcalories" disable readonly ></div> 
                 </div>
                </div>
              

                   <div class="row">
                  <div class="col-4">
                  </div>
                   </div>
                   <p style="margin-top:16px;"><b>Additional Info</b></p>

                   
                     <div class="row">
                     <div class="col-6">
                        <label>Sodium/100g *</label>
                     <div class="try">
                       <q-input 
                       outlined 
                        type="number"
                       v-model="sodiuminfo" disable readonly
                       />
                      </div>
                    <div v-if="submitted && !$v.sodiuminfo.required" class="invalid-feedback">Sodium Field is required</div>
                    </div>

              <div class="col-6">
                   <label>Alcohol (Standard Drinks) *</label>
                     <div class="try alcohol_field">
                      <q-input 
                        outlined 
                         type="number"
                        v-model="alcohol" disable readonly
                       />
                      </div>
                      <div v-if="submitted && !$v.alcohol.required" class="invalid-feedback">Alcohol Field is required</div>
                     </div>
                    </div>

                    
                        <div class="row">
                    <div class="col-6">
                      <label>Dietary Fiber/100g *</label>
                        <div class="try">
                       <q-input 
                         outlined 
                          type="number"
                           v-model="dietfiber" disable readonly  
                         />
                       </div>
                      <div v-if="submitted && !$v.dietfiber.required" class="invalid-feedback">Dietary Fiber is required</div>
                     </div>
                     </div>      

                     
    
                  <div class="col-4 flex justify-center">
                    <q-btn label="Next" color="primary" @click=gotonutritionalinfo() />
                  </div>
                  <div class="col-4">
                  </div>
                  


              
                </div>
              
                </div>

            </q-form>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="nutritionalinfo">
        <div>
          <div class="q-pa-md">
            <q-form>
              <h5 style="margin-top: 0; margin-left: ">Minerals</h5>
              <div class="row">
                <div class="col-4">
                  <label>Calcium(Ca)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="calcium" disable readonly />
                  </div>
                  <label>Iron(Fe)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="iron" disable readonly />
                  </div>
                  <label>Phosphorus(P)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="phosphorus" disable readonly />
                  </div>
                  <label>Sodium(Na)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="sodium" disable readonly />
                  </div>
                </div>
                <div class="col-4">
                  <label>Copper(Cu)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="copper" disable readonly />
                  </div>
                  <label>Magnesium(Mg)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="magnesium" disable readonly />
                  </div>
                  <label>Potassium(K)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="potassium" disable readonly />
                  </div>
                  <label>Zinc(Zn)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="zinc" disable readonly />
                  </div>
                </div>

                <div class="col-4">
                  <label>Iodine(I)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="iodine" />
                  </div>
                  <label>Manganese(Mn)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="manganese" disable readonly />
                  </div>
                  <label>Selenium(Se)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="selenium" disable readonly />
                  </div>
                </div>
              </div>

              <h5 style="margin-top: 0; margin-left: ">Vitamins</h5>
              <div class="row">
                <div class="col-4">
                  <label>Retinol ug/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="retinol" disable readonly />
                  </div>
                  <div align="left">
                    <q-btn
                      label="Back"
                      color="primary"
                      @click="gotofoodinfo()"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <label>Beta Carotene ug/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="betacarotene" disable readonly />
                  </div>
                </div>

                <div class="col-4">
                  <label>Thiamin(B1)mg/100g *</label>
                  <div class="try">
                    <q-input outlined v-model="thiamin" disable readonly />
                  </div>
                  <div>
                    <q-btn
                      style="float: right; margin-right: 32px; width: 72px"
                      label="Next"
                      @click="gotoservings()"
                      color="primary"
                    />
                  </div>
                </div>
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
                        disable
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col">
                    <label>Serving Sizes *</label>
                    <div class="try50 flex justify-between">
                      <q-input
                        outlined
                        v-model="servings.service_size"
                        disable
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </div>
 <div align="left">
                    <q-btn
                      label="Back"
                      color="primary"
                      @click="gotofoodinfo()"
                    />
                  </div>

      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script>
       import axios from "axios";
       import Vue from "vue";
       export default {
       data() {
       return {
          tab: "foodinfo",
          others: "",
          food_name: "",
          descriptionname: "",
          basic_protein: "",
          basic_fats: "",
          basic_carbs: "",
          minerals: "",
          advanced_vitamins: "",
          totalcalories: "",
          advanced_fats: "",
          calcium: "",
          iron: "",
          phosphorus: "",
          sodium: "",
          copper: "",
          magnesium: "",
          potassium: "",
          zinc: "",
          iodine: "",
          manganese: "",
          selenium: "",
          retinol: "",
          betacarotene: "",
          thiamin: "",
          sodiuminfo: "",
          alcohol: "",
          dietfiber: "",
          servingArr:[],
          advanced_macro_category: "Food Category",
          dietary_fiber: "100g",
           selectinput1array: [
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
            this.descriptionname = response.data.Data.descriptionname;
            this.advanced_macro_category = response.data.Data.advanced_macro_category;
            this.dietary_fiber = response.data.Data.dietary_fiber;
            this.totalcalories = response.data.Data.totalcalories;
            this.basic_protein = response.data.Data.basic_protein;
            this.basic_fats = response.data.Data.basic_fats;
            this.basic_carbs = response.data.Data.basic_carbs;
            this.calcium = response.data.Data.calcium;
            this.iron = response.data.Data.iron;
            this.phosphorus = response.data.Data.phosphorus;
            this.sodium = response.data.Data.sodium;
            this.copper = response.data.Data.copper;
            this.magnesium = response.data.Data.magnesium;
            this.potassium = response.data.Data.potassium;
            this.zinc = response.data.Data.zinc;
            this.iodine = response.data.Data.iodine;
            this.manganese = response.data.Data.manganese;
            this.selenium = response.data.Data.selenium;
            this.retinol = response.data.Data.retinol;
            this.betacarotene = response.data.Data.betacarotene;
            this.thiamin = response.data.Data.thiamin;
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



        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
      },
      methods:{
    gotoservings() {
        this.tab= "servings";
    },
    gotonutritionalinfo() {
        this.tab= "nutritionalinfo";
    },
    gotofoodinfo() {
      this.tab= "foodinfo";
    }
  }
}
</script>
<style>
.try {
  height: 35px;
  max-width: 95%;
  margin-bottom: 3%;
}
.try .q-field__control {
  height: 35px;
  max-width: 95%;
  margin-bottom: 3%;
}
.try50 {
  height: 35px;
  max-width: 60%;
  margin-bottom: 3%;
}
.try50 .q-field__control {
  height: 35px;
  margin-bottom: 3%;
}

.tryy {
  height: 35px;
  margin-bottom: 3%;
}
.tryy .q-field__control {
  height: 35px;
  margin-bottom: 3%;
}
.trynew .q-field--auto-height .q-field__control,
.trynew .q-field--auto-height .q-field__native {
  height: 40px;
}
.tryunit {
  height: 30px;
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
.q-field--auto-height .q-field__control,
.q-field--auto-height .q-field__native {
  min-height: 0px;
}
.col.custom {
  margin-top: 20px;
}
.q-field__marginal {
  height: 30px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 24px;
}
.custom {
  font-size: 14px;
}
.customfont {
  font-size: 23px;
}
</style>
