<template>
<div>
       <div>
  <h5 align="center" style="margin:3% 0;">All Head Coaches</h5>
    </div>  
   <div class="q-pa-md">
    <q-table
          v-if="data.length"
          flat
          bordered
          class="statement-table"
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
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
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
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
import axios from "axios";
export default {
data () {
    return {
      hidetable: false,
      filter: "",
      mode: "list",
      pagination: {
        page: 1,
      },
      page: 1,
      totalRecord: 0,
      pageCount: 1,
      columns: [
      {
          name: 'business',
          required: true,
          label: 'Business',
          align: 'left',
          field: row => row.company_name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'head_coach',
          required: true,
          label: 'Head Coach',
          align: 'left',
          field: row => row.contact_name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'assistant_licences', align: 'left', label: 'Coaches', field: row => row.assistant_licences, sortable: true },
        { name: 'athlete_licences', align: 'left',label: 'Athletes', field: row => row.athlete_licences },
        {
          name: "action",
          align: "left",
          label: "Actions",
          field: "action"
        }
      ],
      data: []
    }
  },
  mounted(){
        this.getallheadcoaches();
      },
      methods: {
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
            if (!this.data.length) {
            this.hidetable = true;
            }
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        },
        editItem(item) {
      var Id = item.id;
      this.$router.push({ path: `/editheadcoach/${Id}` });
    },

    viewItem(item){
      var Id = item.id;
      this.$router.push({ path: `/viewheadcoach/${Id}` });
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
          this.$API_URL+ "headcoaches"+'/'+Id,
         
    {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record deleted.",{position:"top-right"});
            this.getallheadcoaches();

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