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
            <q-item-label>Head Coach</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/HeadCoachDashboard" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
          <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Head Coach Dashboard</q-item-label>
          </q-item-section>
        </q-item>


          <q-expansion-item
          icon="people"
          label="Coaches"
          group="somegroup"
        >
          <q-item to="/newcoaches" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>All Coaches</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addnewcoach" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Add Coach</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        
          
        



         <q-expansion-item
          icon="settings"
          label="Settings"
          group="somegroup"
        >

      <q-item to="/headcoachsettings" class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Edit profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/headcoachchangepassword" class="q-ml-xl" active-class="q-item-no-link-highlighting">
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
        name: 'HeadCoachMainLayout',

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
        methods: {
        loggingout() {
   localStorage.setItem("user_token", "");
   localStorage.setItem("user_id", "");
       this.$router.push({path: '/'});
        }
        }
    }
</script>
