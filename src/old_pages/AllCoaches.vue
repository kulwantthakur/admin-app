<template>
<div>
       <div class="row" style="margin:2%;">
       <div class="col flex items-center">
  <h6 style="margin:0!important;">All Coaches</h6>
    </div>
    <div class="col">
    </div>
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
import Vue from "vue";
const defaultItem = {
        exercise_name: '',
        movement_exercise: '',
        master_exercise: ''
      }

const currencyColumns = [
{
          name: 'first_name',
          required: true,
          label: 'Coach',
          align: 'left',
          field: row => row.first_name + ' ' + row.last_name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'status', align: 'left', label: 'Status', align: 'left', field: row => row.status,
          format: val => `${val}`, sortable: true },

        { name: 'licenses', align: 'left', label: 'Licence', field: row => row.licenses,
          format: val => `${val}`, sortable: true },
          {
          name: "action",
          align: "left",
          label: "Actions",
          field: "action"
        }
      ]
import axios from "axios";
export default {
data () {
    return {
      hidetable: false,
      inFs: false,
      noti: () => {},
      show_dialog: false,
      editedIndex: -1,
      editedItem: defaultItem,
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
  mounted(){
        this.getallcoaches();
      },
      methods: {
      editItem(item) {
      var Id = item.id;
      //alert(Id);
      this.$router.push({ path: `/editcoach/${Id}` });
    },

    viewItem(item){
      var Id = item.id;
      this.$router.push({ path: `/viewcoach/${Id}` });
    },
       getallcoaches(){
         axios
        .get(
          this.$API_URL + "coach",
          {
           head_coach_id: localStorage.getItem("user_id")
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => {
            this.currencyData = response.data.data;
            if (!this.currencyData.length) {
            this.hidetable = true;
            }
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
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
          this.$API_URL+ "coach"+'/'+Id,
         
    {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record deleted.",{position:"top-right"});
            this.getallcoaches();
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
      }
      }
  }
</script>


