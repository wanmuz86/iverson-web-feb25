import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddView from '../views/AddView.vue'
import DetailView from '../views/DetailView.vue'
import ContactUsView from '../views/ContactUsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      // If user opens /  -> Home.vue file
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // you call it from the URL with the ID
      // eg: detail/1, detail/2
      path:'/detail/:id',
      name:'detail',
      component:DetailView,
    },
    {
      path:'/add',
      name:'add',
      component:AddView
    },
    // Don't forget to import as well
    // Add another route /contact-us that goes to ContactUsView.vue
    {
      path:'/contact-us',
      name:'contact-us',
      component:ContactUsView
    },
    {
      // If user opens /about -> About.vue file
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      // Catch all the other pages 
      // Redirect to 404 page
      path:'/:pathMatch(.*)*',
      name:'not-found',
      component:NotFoundView
    }
  ],
})

export default router
