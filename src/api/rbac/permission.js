import request from '@/utils/request'

// 获取权限列表
export function getTree(params) {
  return request({
    url: '/user/permission',
    method: 'get',
    params
  })
}

// 获取权限标识
export function permissionCode() {
  return request({
    url: '/user/permission/permission_code',
    method: 'get'
  })
}
