<template>
<q-card>
 <h5 align="center" style="margin-top:0;">Edit Exercise</h5>
        <q-tabs
          v-model="tabexercise"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="basicinfo" label=
          "Basic Info" />
               
        </q-tabs>

        <q-separator />

         <q-tab-panels v-model="tabexercise" animated>
         <q-tab-panel name="basicinfo">
       
            <div class="q-pa-md">
            <q-form
               style="margin:0 7%;">
            <div class="row">
            <div class="col-2">
            </div>
             <div class="col-8">
            <label>Exercise Name</label>
            <div class="try">
              <q-input 
              outlined 
              v-model="exercise_name"
              />
            </div>
            <div v-if="submitted && !$v.exercise_name.required" class="invalid-feedback">Exercise Name is required</div>
            <label>Video Link</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="video_link"
              />
              </div>
             <div style="display:flex;justify-content:center;"> 
              <video width="220" height="150" controls>
            <source src="movie.mp4" type="video/mp4">
             <source src="movie.ogg" type="video/ogg">
            </video>
            </div>
          <div v-if="submitted && !$v.video_link.required" class="invalid-feedback">Video Link is required</div>
            
            <label>Instructions</label>
            <div class="try">
            <q-input 
              outlined 
              v-model="instruction"
            />
            </div>
            <div v-if="submitted && !$v.instruction.required" class="invalid-feedback">Instructions is required</div>

            <div class="row">
            <div class="col-6">
            <label>Competition Lift?</label>
            <br />
            <q-radio size="xs" v-model="competition_lift" val="true" label="Yes" @input="disabletrue()" id="competition_lift_true"/>
            <q-radio size="xs" v-model="competition_lift" val="false" label="No" @input="disablefalse()" id="competition_lift_false"/>

            </div>
            <div class="col-4">
            <label>Track as Competition Lift?</label>
            <br />
            <q-select class="q-mb-lg" outlined v-model="movement_category" :options="movementcategoryarray" :disable="disabled" id="movement_category_active"/>

            </div>
            </div>

                <label>Measured Parameter *</label>
                <div class="try">
                <q-select outlined v-model="measured_parameter" :options="measuredarray" />  
                </div>
                <div v-if="submitted && !$v.measured_parameter.required" style="width:70%;margin-top:-20px;" class="invalid-feedback">Measured Parameter is required</div>

                <label>Tags *</label>
                <div class="try">
                <q-input 
                outlined 
                v-model="tags"
                />
                </div>
                <div v-if="submitted && !$v.tags.required" style="width:70%;margin-top:-20px;" class="invalid-feedback">Tags is required</div>


            <div>
        <q-btn style="float:right; margin-right: 32px;width: 72px;" label="Update" color="primary" @click="updateRow()" />
     </div>
               </div>
               <div class="col-2">
            </div>
           
              </div>

              
                </q-form>

              </div> 
              
           
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
     submitted: false,
           tabexercise: "basicinfo",
           exercise_name: "",
           video_link: "",
           instruction: "",
           competition_lift: "",
           measured_parameter: "",
           tags: "",
           disabled: false,
           competition_lift: "",
           movement_category: "",
               movementcategoryarray: [
             'Squat',
              'Bench Press',
               'Deadlift'
          ],
            measuredarray: [
             'Reps',
              'Seconds',
               'Distance (m)'
        
      ]
       }             
  },
  validations: {
    exercise_name: {
      required
    },
    video_link: {
      required
    },
    instruction: {
      required
    },
     measured_parameter: {
      required
    },
     tags: {
      required
    }

  },
  mounted()
  {
 
   this.getexercises();
  },
  methods:{

    disabletrue() {
       this.disabled= true; 
       this.movement_category = 'Movement Category';
    },
    disablefalse() {
      this.disabled= false;
    },
    getexercises(){
       var id = this.$route.params.id;
         axios
        .get(
          this.$API_URL + "exercise"+'/'+id,
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
             if(response.data.data.competition_lift == "true"){
              this.disabletrue();
             }
            this.exercise_name = response.data.data.exercise_name;
            this.video_link = response.data.data.video_link;
            this.instruction = response.data.data.instruction;
            this.competition_lift = response.data.data.competition_lift;

           // alert(this.competition_lift);


            if (this.competition_lift == 'false') 
            {
                this.movement_category = response.data.data.movement_category;
                this.disablefalse();
               // alert(this.movement_category);
            }
            else
            {
                this.disabletrue();
            }


            this.measured_parameter = response.data.data.measured_parameter;
            this.tags = response.data.data.tags;


        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        },
    updateRow() {

      if(!this.$v.exercise_name.$invalid && !this.$v.video_link.$invalid && !this.$v.instruction.$invalid && !this.$v.measured_parameter.$invalid && !this.$v.tags.$invalid)
      {
  
         if (this.competition_lift == 'false') 
         {
            this.movement_category = this.movement_category;
         }
         else
         {
            this.movement_category = '';
         }

        var id = this.$route.params.id;
        axios.put(
         this.$API_URL + "exercise"+'/'+id,
          {
            
            exercise_name:this.exercise_name,
            video_link:this.video_link,
            instruction:this.instruction,
            competition_lift:this.competition_lift,
            movement_category:this.movement_category,
            measured_parameter:this.measured_parameter,
            tags:this.tags
        
         },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record updated successfully.",{position:"top-right"});
            this.$router.push({path: '/exercises'});

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
      this.submitted_secondtab = true;
       Vue.$toast.error("Please fill all the required fields.",{position:"top-right"});
      }
   } 
  }
}
</script>
<style>
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
    font-size: 20px;
}
.customfont {
    font-size: 23px;
}
.invalid-feedback {
  color: red;
  margin-bottom:3%;
}
</style>