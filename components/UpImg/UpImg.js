// components/UpImg/UpImg.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        deleteImg(e) {
            const { src } = e.currentTarget.dataset
            this.triggerEvent('deleteImg', { src })
        },
        // 全屏预览图片
        amplifierImg() {
            const { src } = this.properties
            wx.previewImage({
                showmenu: false,
                // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
                urls: [src]
            })
        }
    }
})