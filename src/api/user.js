import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login/pwd',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/current/system_user',
    method: 'get'
  })
}

export function logout(token) {
  return request({
    url: '/auth/user/logout',
    method: 'post',
    params: { access_token: token }
  })
}
