import { get } from '../get'

export function getSwiperData(city,item){
	const result = get('/api/homeswiper/' + encodeURIComponent(city) + '/' + item)
	return result
}

export function getAdData() {
    const result = get('/api/homead')
    return result
}

export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}