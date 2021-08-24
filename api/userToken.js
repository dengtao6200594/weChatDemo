import myRequest from '../utils/request'
// 获取用户token
export const getUserToken = data =>
	myRequest({
		url: '/api/public/v1/users/wxlogin',
    method:'POST',
		data
	})
