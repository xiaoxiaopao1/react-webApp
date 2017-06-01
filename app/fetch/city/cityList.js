import { get } from '../get'

export function getCityList(){
	const result = get('/api/citylist');
	return result;
}