<template>
  <div class="page-wrapper">
    <el-row>
      <el-row>
        <el-col>
          <el-button type="primary" :disabled="btnLoading" @click="switchLogAndRegi">
            {{ isLogin ? '注册' : '登陆' }}
            <i class="el-icon-right el-icon--right"></i>
          </el-button>
        </el-col>
      </el-row>
      <!-- 登陆表单 -->
      <el-form v-if="isLogin" ref="loginForm" :model="loginForm" :rules="LoginFormRules" label-width="80px">
        <el-form-item label="登陆名" prop="loginName">
          <el-input v-model="loginForm.loginName" placeholder="注册名/电话/邮箱地址" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
      <!-- 注册表单 -->
      <el-form v-else ref="registerForm" :model="registerForm" :rules="RegisterFormRules" label-width="80px">
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="registerForm.nickName" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-select v-model="registerForm.region">
            <el-option
              v-for="item in PhoneRegionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="registerForm.phone" placeholder="1 23 45 67 89"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="mail">
          <el-input v-model="registerForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col>
        <div ref="googleLogin"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Headers from "~/components/pcindex/header.vue";
import Foots from "~/components/pcindex/foot.vue";
import { initialize as initializeGoogleAccount, renderButton } from './helper'
import { checkValidMail } from '~/utils/validate'
import { createNamespacedHelpers } from 'vuex'
import Api from '~/api'
const { AccountApis } = Api
const { mapActions } = createNamespacedHelpers('auth')

export default {
  components: { Headers, Foots },
  data() {
    return {
      isLogin: true,
      loginForm: {
        loginName: '',
        password: '',
      },
      registerForm: {
        nickName: '',
        region: PhoneRegionOptions[0].value,
        phone: '',
        mail: '',
        password: '',
      },
      btnLoading: false,
    }
  },
  created () {
    this.PhoneRegionOptions = PhoneRegionOptions;
    this.LoginFormRules = LoginFormRules;
    this.RegisterFormRules = RegisterFormRules;
  },
  mounted () {
    this.initializeGoogleLogin();
  },
  methods: {
    ...mapActions(['setAuth']),
    getGoogleAccountInfo (info) {
      AccountApis.createUserByGoogle({ ...info })
        .then(res => this.redirectOnSuccess({ ...res, user: { ...info, userId: res.userId } }))
        .catch(() => this.$message.warning('Google登陆失败，请稍后重试'))
        .finally(() => this.btnLoading = false);
    },
    switchLogAndRegi () {
      this.isLogin = !this.isLogin;
    },
    initializeGoogleLogin () {
      try {
        initializeGoogleAccount(this.getGoogleAccountInfo);
        const containerEl = this.$refs.googleLogin;
        containerEl && renderButton(containerEl);
      } catch (err) { console.error(err) }
    },
    redirectOnSuccess (authInfo) {
      this.setAuth({ authInfo, authorized: true });
      this.$router.push('/pc_index');
    },
    login () {
      const formEl = this.$refs.loginForm;
      if (!formEl) return;
      const cbk = (valid) => {
        if (!valid) return;
        this.btnLoading = true;
        const { loginName, password } = this.loginForm;
        AccountApis.login(loginName, password)
          .then(res => this.redirectOnSuccess({ ...res}))
          .catch(() => this.$message.warning('登陆失败，请稍后重试'))
          .finally(() => this.btnLoading = false);
      }
      formEl.validate?.(cbk);
    },
    register () {
      const formEl = this.$refs.registerForm;
      if (!formEl) return;
      const cbk = (valid) => {
        if (!valid) return;
        this.btnLoading = true;
        AccountApis.createUser({ ...this.registerForm })
          .then(res => this.redirectOnSuccess({ ...res, user: { ...this.registerForm, userId: res.userId } }))
          .catch(() => this.$message.warning('创建账号失败，请稍后重试'))
          .finally(() => this.btnLoading = false);
      }
      formEl.validate?.(cbk);
    }
  }
}
const RegisterFormRules = {
  mail: [
    { required: true, message: '必填', trigger: 'blur' },
    {
      validator: (_, val, cbk) => {
        checkValidMail(val) ? cbk() : cbk(new Error('邮箱不合法'));
      },
      trigger: 'blur'
    }
  ],
  nickName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
};
const LoginFormRules = {
  loginName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
};
const PhoneRegionOptions = [
  { label: '+33', value: '33' },
  { label: '+34', value: '34' },
  { label: '+86', value: '86' },
]
</script>

<style lang="scss" scoped>
.page-wrapper {

}
</style>