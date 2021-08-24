import myRequest from '../utils/request'

// 创建订单
export const createOrder = (data, header) =>
	myRequest({
		url: '/api/public/v1/my/orders/create',
		method: 'POST',
		data,
		header
	})

// 获取支付参数
export const getPayParams = (data, header) =>
	myRequest({
		url: '/api/public/v1/my/orders/req_unifiedorder',
		method: 'POST',
		data,
		header
	})

// 查看微信支付状态
export const chkOrder = (data, header) =>
	myRequest({
		url: '/api/public/v1/my/orders/chkOrder',
		method: 'POST',
		data,
		header
	})
// 历史订单查询
export const queryOrders = (data, header) =>
	myRequest({
		url: '/api/public/v1/my/orders/all',
		data,
		header
	})
