<template>
<div>
       <div>
  <h5 align="center" style="margin:3% 0;">All Exercises</h5>
    </div>  
    <div class="q-pa-md">
         <q-table
          v-if="currencyData.length"
          flat
          bordered
          class="statement-table"
          :data="currencyData"
          :hide-header="mode === 'grid'"
          :columns="currencyColumns"
          row-key="__index"
          :grid="mode == 'grid'"
          :filter="filter"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:top-right="props">
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>


          <template #body-cell-action="props">
              <q-td>
              <q-btn dense flat round color="grey" @click="viewItem(props.row)" icon="preview"></q-btn>
              <q-btn dense flat round color="blue" field="edit" icon="edit" @click="editItem(props.row)"></q-btn>
               <q-btn dense flat round color="red" field="delete" icon="delete" @click="deleteItem(props.row)"></q-btn>
              </q-td>
          </template>
    </q-table>
    <q-table
          v-if="hidetable"
          flat
          bordered
          class="statement-table"
          :data="currencyData"
          :hide-header="mode === 'grid'"
          :columns="currencyColumns"
          row-key="__index"
          :grid="mode == 'grid'"
          :filter="filter"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:top-right="props">
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>


          <template #body-cell-action="props">
              <q-td>
              <q-btn dense flat round color="grey" @click="viewItem(props.row)" icon="preview"></q-btn>
              <q-btn dense flat round color="blue" field="edit" icon="edit" @click="editItem(props.row)"></q-btn>
               <q-btn dense flat round color="red" field="delete" icon="delete" @click="deleteItem(props.row)"></q-btn>
              </q-td>
          </template>
    </q-table>
    </div>
  </div>
             </div>  
             </template>
<script>

       
   

const currencyColumns = [
         {
          name: 'exercise_name',
          required: true,
          label: 'Exercise name',
          align: 'left',
          field: row => row.exercise_name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tags',
          required: true,
          label: 'Tags',
          align: 'left',
          field: row => row.tags,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "action",
          align: 'left',
          label: "Actions",
          field: "action"
        }
      ]
import Vue from "vue";
import axios from "axios";
export default {
  data () {
    return {
      hidetable: false,
       exercise_name: '',
        movement_exercise: '',
        master_exercise: '',
      inFs: false,
      noti: () => {},
      show_dialog: false,
   

      

      filter: "",
      mode: "list",
      currencyColumns: currencyColumns,
      currencyData: [],
      pagination: {
        page: 1,
      },
      page: 1,
      totalRecord: 0,
      pageCount: 1
    }
  },
  methods: {
       getallexercises(){
         axios
        .get(
          this.$API_URL + "exercise",
          {

          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            this.currencyData = response.data.data;
            if (!this.currencyData.length) {
            this.hidetable = true;}
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
    },
    editRow(props) {
      this.noti()
      // do something
      this.noti = this.$q.notify({
        type: 'info',
        textColor: 'grey-10',
        multiLine: true,
        message: `I'll edit row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
        timeout: 2000
      })
    },
    deleteRow(props){
      this.noti()
      // do something
      this.noti = this.$q.notify({
        type: 'negative',
        multiline: true,
        message: `I'll delete row data => ${JSON.stringify(props.row).split(',').join(', ')}`,
        timeout: 2000
      })
    },
    

    deleteItem(item) {
    this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this record?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        var Id = item.id;
        
    axios.delete(
          this.$API_URL+ "exercise"+'/'+Id,
         
    {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record deleted.",{position:"top-right"});
            this.getallexercises();

            })
        .catch(error => {

            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
    
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    
      },
    editItem(item) {
      var Id = item.id;
      this.$router.push({ path: `/editexercise/${Id}` });
    },

    viewItem(item){
      var Id = item.id;
      this.$router.push({ path: `/viewexercise/${Id}` });
    },

    setFs(props){
      props.toggleFullscreen()
      this.inFs = props.inFullscreen
    }
  },
  mounted() {
     this.getallexercises();
  }
  }
</script>