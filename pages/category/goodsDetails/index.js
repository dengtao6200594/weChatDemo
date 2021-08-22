// pages/category/goodsDetails/index.js
import { getGoodsDetail } from '../../../api/category'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        details: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 获取页面商品详情
    onLoad: function(options) {
        getGoodsDetail({ goods_id: options.goods_id }).then(({ message }) => {
            console.log(message)
            const { pics, goods_price, goods_id, goods_name, goods_introduce } =
            message
            let _pics = pics.map(v => ({
                pics_id: v.pics_id,
                pics_sma: v.pics_sma,
                pics_mid: v.pics_mid
            }))
            this.setData({
                details: {
                    pics: _pics,
                    goods_price,
                    goods_id,
                    goods_name,
                    goods_introduce
                }
            })
        })
    },
    // 放大图片
    magnify(e) {
        const urls = this.data.details.pics.map(v => v.pics_mid)
        wx.previewImage({
            current: urls[e.currentTarget.dataset.index], // 当前显示图片的http链接
            urls // 需要预览的图片http链接列表
        })
    },

    // 添加商品到购物车
    shoppingTrolley: [],
    addShoppingTrolley() {
        const shopping = wx.getStorageSync('shoppingTrolley') || []
        const index = shopping.findIndex(
            v => v.goods_id === this.data.details.goods_id
        )
        index === -1 ?
            shopping.push({...this.data.details, num: 1, checked: true }) :
            shopping[index].num++
            wx.setStorageSync('shoppingTrolley', shopping)
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true // 防抖开启
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})