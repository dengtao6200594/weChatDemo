let asyncTime = 0
const myRequest = ({ url, method, data, header }) => {
	asyncTime++
	wx.showLoading({
		title: '加载中'
	})
	return new Promise((resolve, reject) =>
		wx.request({
			url: `https://api-hmugo-web.itheima.net${url}`,
			method: method || 'GET',
			data: data || '',
			header,
			success: result => result.statusCode === 200 && resolve(result.data),
			fail: err => reject(err),
			complete: () => {
				asyncTime--
				if (asyncTime === 0) wx.hideLoading()
			}
		})
	)
}

export default myRequest
