import HomePage from "../views/HomeView.vue"
import Router from "vue-router"
import Vue from "vue"

// route level code-splitting
// this generates a separate chunk (publications.[hash].js) for this route
// which is lazy-loaded when the route is visited.

const RegisterUser = () =>
  import(/* webpackChunkName: "Register " */ "@/views/RegisterView.vue")
const Profile = () =>
  import(/* webpackChunkName: "Publications" */ "@/views/ProfileView.vue")
const MapView = () =>
  import(/* webpackChunkName: "Publications" */ "@/views/MapView.vue")
const PostRegister = () =>
  import(/* webpackChunkName: "Publications" */ "@/views/PostRegisterView.vue")
const ContactView = () =>
  import(/* webpackChunkName: "Contact" */ "@/views/ContactView.vue")
const TermsView = () =>
  import(/* webpackChunkName: "Contact" */ "@/views/TermsView.vue")

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      meta: {
        title: "Helpet - Ayuda a las mascotas a encontrar su hogar"
      }
    },
    {
      path: "/registro",
      name: "RegisterUser",
      component: RegisterUser,
      meta: {
        title: "Registro de usuario",
        user: true
      }
    },
    {
      path: "/perfil",
      name: "Profile",
      component: Profile,
      meta: {
        title: "Perfil del usuario",
        auth: true
      }
    },
    {
      path: "/publicacion",
      name: "RegisterPostPet",
      auth: true,
      component: PostRegister,
      meta: {
        title: "Nueva publicacion",
        auth: true
      }
    },
    {
      path: "/publicaciones",
      name: "MapView",
      component: MapView,
      meta: {
        title: "Publicaciones"
      }
    },
    {
      path: "/contacto",
      name: "Contact",
      component: ContactView,
      meta: {
        title: "Contacto"
      }
    },
    {
      path: "/terms",
      name: "Terms",
      component: TermsView,
      meta: {
        title: "Privacidad y Términos de Uso"
      }
    },
    {
      path: "*",
      name: "Home",
      redirect: { name: "Home" }
      //component: HomePage
    }
  ]
})

export default router
