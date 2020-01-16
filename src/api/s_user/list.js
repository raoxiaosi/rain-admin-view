import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/manager/system_user/list',
    method: 'get',
    params
  })
}
