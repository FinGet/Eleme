/*
 * @Author: Mario
 * @Date: 2017-07-27 11:33:34
 * @Last Modified by: Mario
 * @Last Modified time: 2017-08-01 14:48:43
 */
<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
        </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
        </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <!--keep-alive组件之间切换，状态不变-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/header'
import {urlParse} from './common/js/util';
import Vue from 'vue'
const ERR_OK=0
export default {
  name: 'app',
  data() {
    return{
      seller:{
        id:(() =>{
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id'+ this.seller.id).then((res)=>{
      res=res.body;
      if(res.errno===ERR_OK){
        this.seller = Object.assign({}, this.seller, res.data);
        // console.log(this.seller);
      }
    })
  },
  components: {
    'v-header': Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display :flex
      width :100%
      height :40px
      line-height :40px
      // border-bottom :1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex :1
        text-align :center
        &>a
          display :block
          font-size :14px
          color :rgb(77,85,93)
        .active
          color :rgb(240,20,20)
</style>
