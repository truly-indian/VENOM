import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import login from '@/components/login'
import about from '@/components/about'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    // path: '/',
    // name: 'HelloWorld',
    // component: HelloWorld
    // },
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/about',
      name: 'Aboutus',
      component: about
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
