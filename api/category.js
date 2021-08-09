import myRequest from '../utils/request'
// 获取分类数据
export const getCategoryData = () =>
	myRequest({
		url: '/api/public/v1/categories'
	})
