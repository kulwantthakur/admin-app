<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          style="color:black;"
        />
       
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 540px; max-width: 300px;"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section>
            <q-item-label>Admin</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
          <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        
          
          <q-expansion-item
          icon="engineering"
          label="Head Coach"
          group="somegroup"
        >
          <q-item to="/headcoaches" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>All Head Coaches</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addheadcoach" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Add Head Coach</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
          
          <q-expansion-item
          icon="people"
          label="Coaches"
          group="somegroup"
        >
          <q-item to="/allcoaches" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>All Coaches</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addcoach" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Add Coach</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        

       <q-expansion-item
          icon="fastfood"
          label="Foods"
          group="somegroup"
        >
          <q-item to="/food" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>All Foods</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addfood" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Add Food</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          icon="task"
          label="Exercise"
          group="somegroup"
        >
          <q-item to="/exercises" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>All exercises</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addexercise" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Add exercise</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

         <q-expansion-item
          icon="settings"
          label="Settings"
          group="somegroup"
        >

      <q-item to="/settings" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Edit profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/changepassword" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Change password</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>


        <q-item active-class="q-item-no-link-highlighting" style="cursor:pointer;" >
          <q-item-section avatar>
            <q-icon name="logout"/>
          </q-item-section>
          <q-item-section @click="loggingout" >
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";

    export default {
        name: 'MainLayout',

        components: {
            Messages,
            EssentialLink
        },

        data() {
            return {
                leftDrawerOpen: false,
                thumbStyle: {
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
              },

              barStyle: {
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#027be3',
                width: '9px',
                opacity: 0.2
              }
            }
        },
          mounted() {
            if(localStorage.getItem("user_id") <= 0)
            {
              localStorage.setItem("user_token", "");
              localStorage.setItem("user_id", "");
              this.$router.push({path: '/'});
            }
    
      },
        methods: {
        loggingout() {
            localStorage.setItem("user_token", "");
            localStorage.setItem("user_id", "");
            this.$router.push({path: '/'});
        }
        }
    }
</script>
