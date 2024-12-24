<template>
  <div class="page-wrapper" :class="{ desktop: isDesktop, mobile: isMobile }">
    <img src="/33immo-logo.png" class="top-img block" v-if="isDesktop" />
    <div class="form-wrapper" :class="{ desktop: isDesktop, mobile: isMobile }">
      <el-card>
        <h1 class="form-title bold block text-center" :class="{ desktop: isDesktop, mobile: isMobile }">
          {{ isLogin ? $t('message.global.LOGIN') : '' }}
        </h1>
        <!-- 登陆表单 -->
        <el-form v-if="isLogin" ref="loginForm" :model="loginForm" :rules="LoginFormRules" label-width="120px" :label-position="labelWidth">
          <el-form-item :label="$t('message.global.EMAIL_ADDRESS')" prop="loginName" required>
            <el-input v-model="loginForm.loginName" :placeholder="$t('message.global.EMAIL_ADDRESS')" />
          </el-form-item>
          <el-form-item :label="$t('message.PAGE_LOGIN_REGISTER.PASSWORD')" prop="password" required>
            <el-input v-model="loginForm.password" show-password :placeholder="$t('message.global.PLEASE_ENTER')" />
          </el-form-item>
          <div class="text-center">
            <el-button type="primary" class="btn" :loading="btnLoading" @click="login">{{ $t('message.global.LOGIN') }}</el-button>
          </div>
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
      </el-card>
    </div>
    <!-- <div ref="googleLogin"></div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { initialize as initializeGoogleAccount, renderButton } from './helper';
import rem from '../../common/rem';
import { checkValidMail } from '~/utils/validate';
import { createPath } from '../../utils';
import Api from '~/api';
const { AccountApis } = Api;
const { mapActions } = createNamespacedHelpers('auth');

export default {
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
    const requiredTxt = this.$t('message.global.PLEASE_ENTER');
    const LoginFormRules = {
      loginName: [{ required: true, message: requiredTxt, trigger: 'blur' }],
      password: [{ required: true, message: requiredTxt, trigger: 'blur' }],
    };
    this.LoginFormRules = LoginFormRules;
    this.RegisterFormRules = RegisterFormRules;
  },
  mounted () {
    if (this.isMobile) rem();
    // this.initializeGoogleLogin();
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    labelWidth () {
      if (this.isDesktop)
        return 'left';
      return 'top';
    }
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
      this.$router.push({ path: createPath('/pc_index') });
    },
    login () {
      const formEl = this.$refs.loginForm;
      if (!formEl) return;
      const cbk = (valid) => {
        if (!valid) return;
        this.btnLoading = true;
        const { loginName: email, password } = this.loginForm;
        AccountApis.login({ email, password })
          .then(res => this.redirectOnSuccess({ ...res}))
          .catch(() => {
            this.$message.warning(this.$t('message.PAGE_LOGIN_REGISTER.LOGIN_FAIL'));
            this.btnLoading = false;
          });
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
const PhoneRegionOptions = [
  { label: '+33', value: '33' },
  { label: '+34', value: '34' },
  { label: '+86', value: '86' },
]
</script>

<style lang="scss" scoped>
.page-wrapper {
  .top-img {
    margin: 36px auto;
    height: 76px;
  }
  .form-wrapper {
    .form-title {
      color: #333;
      font-size: 24px;
      margin: 0 auto 16px;
      &.desktop {
        margin-top: 16px;
        margin-bottom: 24px;
      }
    }
    margin: 16px auto;
    &.desktop {
      width: 50%;
      max-width: 560px;
    }
    &.mobile {
      width: 96%;
    }
    .btn {
      background-color: var(--main-purple);
      border: unset;
    }
  }
  &.desktop {
    margin-bottom: 36vh;
  }
}
</style>
