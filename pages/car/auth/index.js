import {getUserToken} from '../../../api/userToken'
// pages/car/auth/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {},
	async getUserProfile() {
		const { encryptedData, rawData, iv, signature } = await new Promise(
			(resolve, reject) => {
				wx.getUserProfile({
					desc: '用于支付信息获取',
					success: res => resolve(res),
					fail: () => reject('获取信息失败')
				})
			}
		)
		const { code } = await new Promise((resolve, reject) =>
			wx.login({
				timeout: 5000,
				success: res => resolve(res)
			})
		)
    const params={encryptedData,rawData,iv,signature,code}
    getUserToken(params).then(res=>{
      wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
      wx.navigateBack({
        delta:-1
      })
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
	onShow: function () {},

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
