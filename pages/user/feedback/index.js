// pages/user/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{ id: 1, value: '体验问题', isActive: true }, { id: 2, value: '商品、商品投诉', isActive: false }],
        chooseImageArr: [], //选择图片数组
    },
    timer: null,
    value: null, //文本框内容
    handleTabsChange(e) {
        const { index } = e.detail
        const tabs = this.data.tabs.map((v, i) => {
            index === i ? (v.isActive = true) : (v.isActive = false)
            return v
        })
        this.setData({ tabs })
    },
    // 加载本地图片
    handleChooseImage() {
        wx.chooseImage({
            count: 9, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: res => {
                // console.log(res)
                // const {tempFilePaths}=res
                this.setData({ chooseImageArr: res.tempFilePaths })
            }
        })
    },
    // 文本框内容获取
    textareaInput(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.value = e.detail.value, 1000)
    },
    // 提交
    submit() {
        // 文件只能单个传输
        const { chooseImageArr } = this.data
        chooseImageArr.forEach(v => {
            wx.uploadFile({
                url: 'https://images.ac.cn/Home/Index/UploadAction/',
                filePath: 'filePath',
                name: v,
                // header: {}, // 设置请求的 header
                // formData: {}, // HTTP 请求中其他额外的 form data
                success: res => {
                    console.log(res)
                }
            })
        })
    },

    // 删除图片
    deleteImg(e) {
        const { src } = e.detail
        const { chooseImageArr } = this.data
        chooseImageArr.splice(chooseImageArr.findIndex(v => v === src), 1)
        this.setData({ chooseImageArr })
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})