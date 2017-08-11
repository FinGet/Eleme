/*
 * @Author: Mario 
 * @Date: 2017-07-27 10:55:12 
 * @Last Modified by: Mario
 * @Last Modified time: 2017-07-27 11:44:24
 */
import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'//'@': resolve('src')

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass:'active',//设置a标签点击后的class
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    { //重定向 加载首页
      path: '/', 
      redirect: '/goods' 
    }
  ]
})

