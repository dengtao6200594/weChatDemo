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
    handleChooseAddress() {
        wx.chooseAddress({
            success: res => wx.setStorageSync('address', res)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let cart = wx.getStorageSync('shoppingTrolley') || []
        const address = wx.getStorageSync('address')
        const result = this.calculate(cart)
        this.setData({ address, cart, isAllChecked: result[0], checkedNum: result[1], totalPrice: result[2] })
            // let isAllChecked = true
            // let totalPrice = 0
            // let checkedNum = 0
            // cart.forEach(v =>
            //     v.checked && (checkedNum += 1) && (totalPrice += v.goods_price) || (isAllChecked = false)
            // )
            // if (cart.length === 0) isAllChecked = false
            // this.setData({ address, cart, isAllChecked, checkedNum, totalPrice })
    },
    // 修改本地存储和被选定的状态
    isChecked(e) {
        const { cart } = this.data
        const id = e.currentTarget.dataset.id
        const index = cart.findIndex(v => v.goods_id === id)
        cart[index].checked = !cart[index].checked
        const result = this.calculate(cart)
        this.setData({ cart, isAllChecked: result[0], checkedNum: result[1], totalPrice: result[2] })
        wx.setStorageSync('shoppingTrolley', cart)
    },
    // 全选功能
    isAllChecked() {
        const { cart, isAllChecked } = this.data
        cart.forEach(v => v.checked = !isAllChecked)
        this.setData({
            isAllChecked: !isAllChecked,
            cart
        })
        wx.setStorageSync('shoppingTrolley', cart)
    },
    // 商品数量加减
    async numChange(e) {
        const { id, operation } = e.currentTarget.dataset
        const { cart } = this.data
        const index = cart.findIndex(v => v.goods_id === id)
        const enums = new Map([
            [1, () => cart[index].num++],
            [-1, () => {
                if (cart[index].num > 1) {
                    cart[index].num--
                } else {
                    return new Promise((resolve, rejects) => {
                        wx.showModal({
                            title: '提示',
                            content: '是否删除该物品',
                            success(res) {
                                if (res.confirm) {
                                    cart.splice(index, 1)
                                    resolve()
                                } else if (res.cancel) {
                                    rejects()
                                }
                            }
                        })
                    })
                }
            }]
        ])
        await enums.get(operation)()
        this.setData({ cart })
        wx.setStorageSync('shoppingTrolley', cart)
    },

    // footer计算值
    calculate(cart) {
        let isAllChecked = true
        let checkedNum = 0
        let totalPrice = 0
        cart.forEach(v =>
            v.checked && (checkedNum += 1) && (totalPrice += v.goods_price) || (isAllChecked = false)
        )
        if (cart.length === 0) isAllChecked = false
        return [isAllChecked, checkedNum, totalPrice]
    },
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