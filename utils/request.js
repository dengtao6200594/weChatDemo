let asyncTime = 0
const myRequest = ({ url, method, data }) => {
	asyncTime++
	wx.showLoading({
		title: '加载中'
	})
	return new Promise((resolve, reject) =>
		wx.request({
			url: `https://api-hmugo-web.itheima.net${url}`,
			method: method || 'GET',
			data: data || '',
			success: result => result.statusCode === 200 && resolve(result.data),
			fail: err => reject(err),
			complete: () => asyncTime-- && asyncTime === 0 && wx.hideLoading()
		})
	)
}

export default myRequest
