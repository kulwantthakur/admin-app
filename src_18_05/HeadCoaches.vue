<template>
<div>
       <div>
  <h5 align="center" style="margin:3% 0;">All Head Coaches</h5>
    </div>  
   <div class="q-pa-md">
    <q-table
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
              </q-td>
          </template>
    </q-table>
    </div>
  </div>
 </div>  
 </template>
<script>
import axios from "axios";
export default {
data () {
    return {
      filter: "",
      mode: "list",
      pagination: {
        page: 1,
      },
      page: 1,
      totalRecord: 0,
      pageCount: 1
    },
      columns: [
      {
          name: 'business',
          required: true,
          label: 'Business',
          align: 'left',
          field: row => row.business,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'head_coach',
          required: true,
          label: 'Head Coach',
          align: 'left',
          field: row => row.first_name + ' ' + row.last_name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'coaches_number', align: 'left', label: 'Coaches', field: row => row.coaches_number, sortable: true },
        { name: 'athletes_number', align: 'left',label: 'Athletes', field: row => row.athletes_number },
        { name: 'actions', align: 'left', label: 'Actions', field: '' }
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
    }
      }
  }
</script>