// pages/orders/index.js
import { queryOrders } from '../../api/orders'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: [
			{ id: 0, value: '全部', isActive: false },
			{ id: 1, value: '待付款', isActive: false },
			{ id: 2, value: '待发货', isActive: false },
			{ id: 3, value: '退款/退货', isActive: false }
		],
		orders: []
	},
	handleTabsChange(e) {
		const { index } = e.detail
		this.changeTitleByIndex(index)
		// 获取历史订单数据
		this.getOrders(index + 1)
	},

	// 通过下标修改isActive的值
	changeTitleByIndex(index) {
		const tabs = this.data.tabs.map((v, i) => {
			index === i ? (v.isActive = true) : (v.isActive = false)
			return v
		})
		this.setData({ tabs })
	},

	// 请求获取历史订单
	getOrders(type) {
		// 没有token则跳转授权页面
		const Authorization = wx.getStorageSync('token')
		if (!Authorization) {
			wx.navigateTo({
				url: '/pages/car/auth/index'
			})
			return
		}
		// 获取历史订单数据
		queryOrders({ type }, { Authorization }).then(({ message }) => {
			let { orders } = message
			orders = orders.map(v => ({
				order_number: v.order_number,
				order_price: v.order_price,
        // 本地日期转换
				create_time: new Date(v.create_time * 1000).toLocaleString()
			}))
			this.setData({ orders })
		})
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
		// 通过getCurrentPage()获取页面上的id参数
		const page = getCurrentPages()
		const { type } = page[page.length - 1].options
		// 根据type改变初始数据
		this.changeTitleByIndex(type - 1)
		this.getOrders(type)
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
