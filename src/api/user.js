import request from '@/utils/request';

export function login(data) {
	return request({
		url: '/system/login',
		method: 'post',
		data,
	});
}

export function getInfo(token) {
	return request({
		url: '/account/info',
		method: 'post',
		params: { token },
	});
}

export function logout() {
	return request({
		url: '/system/logout',
		method: 'post',
	});
}
