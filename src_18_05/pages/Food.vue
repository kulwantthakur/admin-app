<template>
<div>
<div>
  <h5 align="center" style="margin:3% 0;">All Foods</h5>
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
import axios from "axios";
import Vue from "vue";
export default {
data () {
    return {
     hidetable: false,
      columns: [
        {
          name: 'food_name',
          required: true,
          label: 'Food',
          align: 'left',
          field: row => row.food_name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'dietary_fiber',
          required: true,
          label: 'Unit of Measure',
          align: 'left',
          field: row => row.dietary_fiber,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'basic_proteins',
          required: true,
          label: 'Protein/100',
          align: 'left',
          field: row => row.basic_proteins,
          format: val => `${val}`,
          sortable: true
        },
         {
          name: 'basic_fats',
          required: true,
          label: 'fats/100',
          align: 'left',
          field: row => row.basic_fats,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'basic_carbs',
          required: true,
          label: 'Carbs/100',
          align: 'left',
          field: row => row.basic_carbs,
          format: val => `${val}`,
          sortable: true
        },

         {
          name: 'totalcalories',
          required: true,
          label: 'Calories',
          align: 'left',
          field: row => row.totalcalories,
          format: val => `${val}`,
          sortable: true
        },
           
        {
          name: 'advanced_macro_category',
          required: true,
          label: 'Category',
          align: 'left',
          field: row => row.advanced_macro_category,
          format: val => `${val}`,
          sortable: true
        },
          {
          name: "action",
          align: "left",
          label: "Actions",
          field: "action"
        }
        
      ],
      data: [],
      filter: "",
      mode: "list",
      pagination: {
        page: 1,
      },
      page: 1,
      totalRecord: 0,
      pageCount: 1
    }
  },
  mounted(){
        this.getallfoods();
      },
      methods: {
        getallfoods(){
         axios
        .get(
          this.$API_URL + "food",
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
            console.log(this.data);
        })
        .catch(error => {
            Vue.$toast.error("There has been some problem. Please try again later.", {
              position: "top-right"
            });
        });
        },
        editItem(item) {
      var Id = item.id;
      //alert(Id);
      this.$router.push({ path: `/editfood/${Id}` });
    },

    viewItem(item){
      var Id = item.id;
      this.$router.push({ path: `/viewfood/${Id}` });
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
          this.$API_URL+ "food"+'/'+Id,
         
    {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {

            Vue.$toast.success("Record deleted.",{position:"top-right"});
            this.getallfoods();

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
