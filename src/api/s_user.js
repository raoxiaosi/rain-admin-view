import request from '@/utils/request'

// 获取系统用户列表
export function getList(params) {
  return request({
    url: '/user/manager/system_user/list',
    method: 'get',
    params
  })
}

// 获取系统用户详情信息
export function getDetail(param) {
  return request({
    url: '/user/manager/system_user/' + param,
    method: 'get'
  })
}
