import request from '@/utils/request'

// 获取系统用户详情信息
export function loginOutLog(userId, accountType) {
  return request({
    url: '/log/log/login_logout/' + userId,
    method: 'get',
    params: {
      accountType: accountType
    }
  })
}
