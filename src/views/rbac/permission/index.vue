<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <div class="app-container">
          <el-tree
            v-loading="treeLoading"
            class="permission-tree"
            :data="permissionTree"
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)"
                >修改</el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >删除</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="permissionData" label-width="80px">
          <el-form-item label="权限名称:">
            <el-input v-model="permissionData.permissionName" />
          </el-form-item>
          <el-form-item label="权限标识:">
            <el-select v-model="permissionData.permissionCode" placeholder="请选择权限标识">
              <el-option
                v-for="code in permissionCodes"
                :key="code.permissionCode"
                :label="code.permissionDesc"
                :value="code.permissionCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="permissionData.permissionDesc" type="textarea" :rows="5" />
          </el-form-item>
          <el-form-item label="父类权限:">
            <el-select v-model="permissionData.parentId" placeholder="请选择父类权限">
              <el-option
                v-for="permission in permissions"
                :key="permission.id"
                :label="permission.permissionName"
                :value="permission.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { getTree } from '@/api/rbac/permission'
import { permissionCode } from '@/api/rbac/permission'

export default {
  name: 'PermissionIndex',
  data() {
    return {
      treeLoading: true,
      permissionData: {
        id: '',
        permissionName: '',
        permissionCode: '',
        permissionDesc: '',
        parentId: ''
      },
      permissionCodes: null,
      permissions: [],
      permissionTree: null,
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      }
    }
  },
  created() {
    this.fetchData()
    this.getPermissionCode()
  },
  methods: {
    fetchData() {
      this.treeLoading = true
      getTree().then(response => {
        this.permissionTree = response.data
        this.treeLoading = false
        this.getAllPermission(response.data)
      })
    },
    getPermissionCode() {
      permissionCode().then(response => {
        this.permissionCodes = response.data
      })
    },
    getAllPermission(permissionTree) {
      for (var i = 0; i < permissionTree.length; i++) {
        if (permissionTree[i].children.length > 0) {
          this.getAllPermission(permissionTree[i].children)
        } else {
          var item_json = {
            id: permissionTree[i].id,
            permissionName: permissionTree[i].permissionName
          }
          this.permissions.push(item_json)
        }
      }
    }
  }
}
</script>

<style scoped>
  .permission-tree {
    font-size: 13px;
  }
</style>
