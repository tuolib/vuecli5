import request from '@/utils/request';

export function getRoutes() {
	return request({
		url: '/account/routes',
		method: 'post',
	});
}

export function getRoles() {
	return request({
		url: '/account/roles',
		method: 'post',
	});
}

export function addRole(data) {
	return request({
		url: '/vue-element-admin/role',
		method: 'post',
		data,
	});
}

export function updateRole(id, data) {
	return request({
		url: `/vue-element-admin/role/${id}`,
		method: 'put',
		data,
	});
}

export function deleteRole(id) {
	return request({
		url: `/vue-element-admin/role/${id}`,
		method: 'delete',
	});
}
