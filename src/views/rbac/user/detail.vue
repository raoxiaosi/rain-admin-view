<template>
  <div class="app-container">
    <el-row>
      <el-col :span="7" class="txt-right avatar"><el-avatar :src="user_detail.avatar"/></el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">用户名:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.userName}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">昵称:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.nickName}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">手机号码:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.phone}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">登录密码:</el-col>
      <el-col :span="5" class="txt-right"><el-button type="text" size="small">重置密码</el-button></el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">邮箱:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.email}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">状态:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.status}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">注册时间:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.createTime}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">最近修改时间:</el-col>
      <el-col :span="5" class="txt-right">{{user_detail.updateTime}}</el-col>
    </el-row>
    <el-row class="row-item">
      <el-col :span="2" class="txt-left">角色:</el-col>
      <el-col :span="5" class="txt-right">
        <el-tag
          v-for="role in user_detail.userRoleVOList"
          :key="role.roleName"
          closable
          :type="role.id">
          {{role.roleName}}
        </el-tag>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="12">
        <div class="block">
          <el-timeline>
            <el-timeline-item v-for="log in login_logout_log" :key="log.createTime" v-bind:timestamp="log.createTime" placement="top">
              <el-card>
                <h4>{{log.country}} {{log.province}} {{log.city}} {{log.isp}}</h4>
                <p>ip: {{log.ip}} </p>
                <p>操作:{{operation(log.type)}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { getDetail } from '@/api/s_user'
import { loginOutLog } from '@/api/log'

export default {
  name: 'SystemUserDetail',
  data() {
    return {
      user_detail: {
        avatar: ''
      },
      login_logout_log: null
    }
  },
  created() {
    this.getDetail(this.$route.params.id)
  },
  mounted() {
    this.loginLogoutLog(this.$route.params.id)
  },
  methods: {
    getDetail(userId) {
      getDetail(userId).then(response => {
        this.user_detail = response.data
      })
    },
    loginLogoutLog(userId) {
      loginOutLog(userId, 'admin').then(response => {
        this.login_logout_log = response.data.data
      })
    },
    operation(type) {
      switch (type) {
        case 1:
          return '密码登录'
        case 2:
          return '短信验证码登录'
        case 3:
          return '微信第三方登录'
        case 10:
          return '正常登出'
        case 11:
          return '强制登出'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
  .app-container{
    font-size: 14px;
  }
  .row-item{
    display: flex;
    align-items: center;
    height: 35px;
  }
  .txt-left{
    text-align: right;
  }
  .txt-right{
    text-align: left;
    margin-left: 50px;
  }
  .avatar{
    margin-left: 100px;
    height: 60px;
  }
</style>
