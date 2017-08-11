/*
 * @Author: Mario 
 * @Date: 2017-08-01 13:42:39 
 * @Last Modified by: Mario
 * @Last Modified time: 2017-08-01 15:45:20
 */
<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" @click.stop="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
		</div>
		<!-- <div class="ball-container">
			<transition name="drop">
				<div class="ball" v-for="ball in balls" :key="ball.id" v-show="ball.show"></div>
				<div class="inner"></div>
			</transition>
		</div> -->
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods" :key="food.id">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<CartControl :food="food"></CartControl>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
  </div>
</template>

<script>
import CartControl from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'shopcart',
	data() {
		return {
			fold:true
		}
	},
	props:{
		selectFoods: {
			type: Array,
			default() {
				return []
			}
		},
		deliveryPrice: {
        type: Number,
        default: 0
      },
		minPrice: {
			type: Number,
			default: 0
		}
	},
	components:{
		CartControl
	},
	computed:{
		totalPrice() {
			let total = 0;
			this.selectFoods.forEach((food) => {
				total += food.price * food.count;
			})
			return total;
		},
		totalCount() {
			let count = 0;
			this.selectFoods.forEach((food) => {
				count += food.count;
			})
			return count;
		},
		payDesc() {
			if (this.totalPrice === 0) {
				return `￥${this.minPrice}元起送`;
			} else if (this.totalPrice < this.minPrice) {
				let diff = this.minPrice - this.totalPrice;
				return `还差￥${diff}元起送`;
			} else {
				return '去结算';
			}
		},
		payClass() {
			if (this.totalPrice < this.minPrice) {
				return 'not-enough';
			} else {
				return 'enough';
			}
		},
		listShow() {
			if(!this.totalCount){
				this.fold = true;
				return false;
			}
			let show = !this.fold;
			if(show) {
				this.$nextTick( ()=> {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			}
			return show;
		}
	},
	methods: {

		// 点击shopcart显示/隐藏购物车列表
		toggleList() {
			if(!this.totalCount){
				return;
			}
			// alert(this.totalCount);
			this.fold = !this.fold;
		},
		//清空购物车列表
		empty() {
			this.selectFoods.forEach( (food)=> {
				food.count = 0;//只需要把food的cout赋值为0就达到清空的效果
			})
		},
		//点击蒙版层隐藏购物车列表
		hideList() {
			this.fold = true;
		},
		//点击结算
		pay() {
			if(this.totalPrice<this.minPrice){
				return;
			}
			//订单详情 未实现
			window.alert(`支付${this.totalPrice}元`);
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.shopcart
	position :fixed
	left :0
	bottom :0
	z-index :50
	width :100%
	height :48px
	// background :#000
	.content
		display :flex
		background :#141d27
		font-size :0
		color :rgba(255,255,255,.4)
		.content-left
			flex :1
			.logo-wrapper
				display :inline-block
				vertical-align :top				
				position :relative
				top :-10px
				margin :0 12px
				padding :6px
				width :56px
				height :56px
				box-sizing :border-box
				border-radius :50%
				background :#141d27
				.logo
					width:100%
					height :100%
					border-radius :50%
					text-align :center
					background :#2b343c
					&.highlight
						background :rgb(0,160,220)
					.icon-shopping_cart
						line-height :44px
						font-size :24px
						color :#80858a
						&.highlight
							color :#fff
				.num
					position :absolute
					top:0
					right :0
					width :24px
					height :16px
					line-height :16px
					text-align :center
					border-radius :16px
					font-size :9px
					font-weight :700
					color :#fff
					background :rgb(240,20,20)
					box-shadow :0 4px 8px 0 rgba(0,0,0,0.4)
			.price
				display :inline-block
				vertical-align :top
				line-height :24px
				margin-top :12px
				padding-right :12px
				box-sizing :border-box
				border-right:1px solid rgba(255,255,255,.1)
				font-size :16px
				font-weight :700
				&.highlight
					color :#fff
			.desc
				display :inline-block
				vertical-align :top
				line-height :24px
				margin :12px 0 0 12px
				font-size :10px
				font-weight :700
				color :rgba(255,255,255,.4)
		.content-right
			flex :0 0 105px
			width :105px
			.pay
				height: 48px
				line-height: 48px
				text-align: center
				font-size: 12px
				font-weight: 700
				&.not-enough
					background: #2b333b
				&.enough
					background: #00b43c
					color: #fff

	.shopcart-list
		position :absolute
		bottom :47px
		left :0
		z-index :-1
		width :100% 
		transition :all .5s
		&.fold-enter,&.fold-leave-to	
			transform :translate3d(0,100%,0)
		&.fold-leave
			transform :translate3d(0,0,0)
		.list-header
			height: 40px
			line-height: 40px
			padding: 0 18px
			background: #f3f5f7
			border-bottom: 1px solid rgba(7, 17, 27, 0.1)
			.title
				float: left
				font-size: 14px
				color: rgb(7, 17, 27)
			.empty
				float: right
				font-size: 12px
				color: rgb(0, 160, 220)
		.list-content
			padding: 0 18px
			max-height: 217px
			overflow: hidden
			background: #fff
			.food
				position: relative
				padding: 12px 0
				box-sizing: border-box
				border-1px(rgba(7, 17, 27, 0.1))
				.name
					line-height: 24px
					font-size: 14px
					color: rgb(7, 17, 27)
				.price
					position: absolute
					right: 90px
					bottom: 12px
					line-height: 24px
					font-size: 14px
					font-weight: 700
					color: rgb(240, 20, 20)
				.cartcontrol-wrapper
					position: absolute
					right: 0
					bottom: 6px
	.list-mask
		position :fixed
		top :0
		left :0
		width :100%
		height :100%
		z-index :-2
		backdrop-filter: blur(10px)
		background: rgba(7, 17, 27, 0.6)
		transition :all 0.5s
		&.fade-enter,&.fade-leave-to
			opacity :0
			background: rgba(7, 17, 27, 0)
		&.fade-leave
			opacity :1
			background: rgba(7, 17, 27, 0.6)
</style>