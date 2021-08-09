const myRequest = ({ url, method, data }) =>
	new Promise((resolve, reject) =>
		wx.request({
			url: `https://api-hmugo-web.itheima.net${url}`,
			method: method || 'GET',
			data: data || '',
			success: result => result.statusCode === 200 && resolve(result.data),
			fail: err => reject(err)
		})
	)
export default myRequest
