import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import Article from '../pages/Article'
import ArticleEditor from '../components/ArticleEditor'
import Admin from '../pages/Admin'
import NotFound from '../pages/NotFound'
import Signout from '../pages/signout'
// import Archive from '../components/Archive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/article/add',
      name: 'ArticleAdd',
      component: ArticleEditor
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/archive/:year/:month',
      name: 'Archive',
      component: Home
    },
    {
      path: '/article/tag/:id',
      name: 'Target',
      component: Home
    },
    {
      path: '/article/:id/editor',
      name: 'ArticleEdit',
      component: ArticleEditor
    },
    {
      path: '/article/:id/delete',
      name: 'ArticleDelete',
      component: ArticleEditor
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter (to, from, next) {
        if (window.localStorage.getItem('userId')) {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/signout',
      name: 'Signout',
      component: Signout
    }
  ]
})
