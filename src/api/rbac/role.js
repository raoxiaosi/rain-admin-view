import request from '@/utils/request'

// 获取角色列表
export function getList(params) {
  return request({
    url: '/user/role',
    method: 'get',
    params
  })
}
