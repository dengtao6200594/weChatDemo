import myRequest from '../utils/request'
//  获取轮播图数据
export const getSwiper = () =>
	myRequest({
		url: '/api/public/v1/home/swiperdata'
	})
// 获取导航数据
export const getCatItems = () =>
	myRequest({
		url: '/api/public/v1/home/catitems'
	})
// 获取楼层数据
export const getFloorData = () =>
	myRequest({
		url: '/api/public/v1/home/floordata'
	})
