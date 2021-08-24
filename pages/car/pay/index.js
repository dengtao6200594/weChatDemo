/* 
1、企业账号可以微信支付
企业账号小程序后台必须给开发者添加上白名单
一个appid可以绑定多个开发者
这些开发者可以公用这个appid和它的开发权限
*/
import { createOrder, getPayParams, chkOrder } from '../../../api/orders'
// pages/car/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		address: {},
		cart: [],
		isAllChecked: false,
		checkedNum: 0,
		totalPrice: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		const { provinceName, cityName, countyName, detailInfo } =
			wx.getStorageSync('address')
		const address = `${provinceName}${cityName}${countyName}${detailInfo}`
		const cart = wx.getStorageSync('shoppingTrolley').filter(v => v.checked)
		const totalNum = cart.length
		let totalPrice = 0
		cart.forEach(v => (totalPrice += v.goods_price))
		this.setData({
			address,
			cart,
			totalNum,
			totalPrice
		})
	},
	// 支付按钮，先判断是否有token缓存，没有跳转获取登录信息
	async handlePayment() {
		const token = wx.getStorageSync('token')
		!token &&
			wx.navigateTo({
				url: '/pages/car/auth/index'
			})
		const { totalPrice, address, cart } = this.data
		let goods = []
		cart.forEach(v =>
			goods.push({
				goods_id: v.goods_id,
				goods_number: v.num,
				goods_price: v.goods_price
			})
		)
		const header = { Authorization: token }
		const data = { order_price: totalPrice, consignee_addr: address, goods }
		try {
			const { message } = await createOrder(data, header)
			const { order_number } = message
			const res = await getPayParams({ order_number }, header)
			const { pay } = res.message
			// 挂起微信支付
			const result = pay =>
				new Promise((resolve, reject) =>
					wx.requestPayment({
						...pay,
						success: () => resolve(),
						fail: e => reject(e)
					})
				)
			await result(pay)
			await chkOrder({ order_number }, header)
			await (() =>
				new Promise(resolve =>
					wx.showToast({
						title: '支付成功',
						success: () => resolve()
					})
				))()
			// 删除已经支付的商品
			const cart = wx.getStorageSync('shoppingTrolley').filter(v => !v.checked)
			this.setData({ cart })
			// 支付成功跳转订单页面
			wx.navigateTo({
				url: '/pages/car/pay/index'
			})
		} catch (e) {
			wx.showToast({
				title: '支付失败',
				icon: 'error'
			})
		}
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})
