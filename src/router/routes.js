const routes = [
  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/Dashboard', component: () => import('pages/Dashboard.vue')},
      {path: '/addheadcoach', component: () => import('pages/AddHeadCoach.vue')},
      {path: '/addcoach', component: () => import('pages/AddCoach.vue')},
      {path: '/headcoaches', component: () => import('pages/HeadCoaches.vue')},
      {path: '/allcoaches', component: () => import('pages/AllCoaches.vue')},
      {path: '/food', component: () => import('pages/Food.vue')},
      {path: '/exercises', component: () => import('pages/Exercise.vue')},
      {path: '/addfood', component: () => import('pages/AddFood.vue')},
      {path: '/addexercise', component: () => import('pages/AddExercise.vue')},
      {path: '/editexercise/:id', component: () => import('pages/EditExercise.vue')},
      {path: '/viewexercise/:id', component: () => import('pages/ViewExercise.vue')},
      {path: '/editcoach/:id', component: () => import('pages/EditCoach.vue')},
      {path: '/viewcoach/:id', component: () => import('pages/ViewCoach.vue')},
      {path: '/editfood/:id', component: () => import('pages/EditFood.vue')},
      {path: '/viewfood/:id', component: () => import('pages/ViewFood.vue')},
      {path: '/editheadcoach/:id', component: () => import('pages/EditHeadCoach.vue')},
      {path: '/viewheadcoach/:id', component: () => import('pages/ViewHeadCoach.vue')},
      {path: '/settings', component: () => import('pages/EditProfile.vue')},
      {path: '/changepassword', component: () => import('pages/ChangePassword.vue')}
    ]
  },
  {
    path: '',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/CoachDashboard',
    component: () => import('layouts/CoachLayout.vue'),
    children: [
      {path: '/coachdashboard', component: () => import('pages/CoachDashboard.vue')},
      {path: '/coachsettings', component: () => import('pages/EditProfile.vue')},
      {path: '/coachchangepassword', component: () => import('pages/ChangePassword.vue')}
    ]
  },

   {
    path: '/HeadCoachDashboard',
    component: () => import('layouts/HeadCoachMainLayout.vue'),
    children: [
       {path: '/headcoachdashboard', component: () => import('pages/HeadCoachDashboard.vue')},
       {path: '/newcoaches', component: () => import('pages/NewCoaches.vue')},
       {path: '/addnewcoach', component: () => import('pages/AddNewCoach.vue')},
       {path: '/viewnewcoach/:id', component: () => import('pages/ViewNewCoach.vue')},
       {path: '/editnewcoach/:id', component: () => import('pages/EditNewCoach.vue')},
       {path: '/headcoachsettings', component: () => import('pages/EditProfile.vue')},
      {path: '/headcoachchangepassword', component: () => import('pages/ChangePassword.vue')}
    ]
  },



  {path: '/forgotpassword', component: () => import('pages/ForgotPassword.vue')},
  {path: '/updatepassword/:token', component: () => import('pages/UpdatePassword.vue')},
  {path: '/generatepassword/:token', component: () => import('pages/GeneratePassword.vue')},
  
  {path: '/generatecoachpassword/:token', component: () => import('pages/GenerateCoachPassword.vue')},

  {path: '/privacypolicy', component: () => import('pages/PrivacyPolicy.vue')},
  {path: '/termsandconditions', component: () => import('pages/TermsConditions.vue')},
  {path: '/contactus', component: () => import('pages/ContactUs.vue')}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
