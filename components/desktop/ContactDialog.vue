<template>
  <el-dialog
    :title="$t('message.global.CONTACT_US')"
    :visible.sync="visible"
    width="800px"
    :close-on-click-model="false"
  >
    <div class="content">
      <div class="titles">
        <div v-for="it in titles" :key="it.label" class="item">
          <span class="label">{{ it.label }}:</span>
          <span class="text">{{ it.text }}</span>
        </div>
      </div>
      <div class="form">
        <el-form ref="form" :model="form" label-width="220px">
          <el-form-item prop="firstName" :label="$t('message.global.FIRST_NAME')"
            :rules="{ required: true, message: $t('message.global.PLEASE_ENTER') }"
          >
            <el-input v-model="form.firstName" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
          </el-form-item>
          <el-form-item prop="lastName" :label="$t('message.global.LAST_NAME')"
            :rules="{ required: true, message: $t('message.global.PLEASE_ENTER') }"
          >
            <el-input v-model="form.lastName" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
          </el-form-item>
          <el-form-item prop="mail" :label="$t('message.global.CONTACT_EMAIL_ADDRESS')"
            :rules="[
              { required: true, message: $t('message.global.PLEASE_ENTER') },
              { type: 'email', message: $t('message.global.INVALID') }
            ]"
          >
            <el-input v-model="form.mail" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
          </el-form-item>
          <el-form-item prop="phone" :label="$t('message.global.CONTACT_PHONE')"
            :rules="{ required: true, message: $t('message.global.PLEASE_ENTER') }"
          >
            <div class="phone-form">
              <el-select
                v-model="form.code"
                filterable
                remote
                :remote-method="filterBySearch"
                :loading="false"
                :placeholder="$t('message.global.PLEASE_SELECT')"
                style="width: 120px;margin-right: 8px;"
              >
                <el-option
                  v-for="it in filtered" :key="it.code"
                  :label="it.flag" :value="it.code"
                >
                  <span style="float:left">{{ it.flag }}</span>
                  <span style="float:right">{{ it.dial_code }}</span>
                </el-option>
              </el-select>
              <el-input v-model="form.phone" :placeholder="$t('message.global.PLEASE_ENTER')" />
            </div>
          </el-form-item>
          <el-form-item prop="message" :label="$t('message.global.LEAVE_YOUR_MESSAGE')">
            <el-input type="textarea" v-model="form.message" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="$emit('close')">{{ $t('message.global.CANCEL') }}</el-button>
      <el-button type="primary" @click="confirm" :loading="confirmBtnLoading">{{ $t('message.global.CONFIRM') }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="js">
import { JsonConfig } from '../../common/config';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    titles: {
      type: Array,
      required: true
    },
    confirmBtnLoading: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      filtered: [],
      allOptions: [],
      form: {
        firstName: '',
        lastName: '',
        mail: '',
        phone: '',
        message: '',
        code: ''
      }
    }
  },
  created () {
    if (process.client) {
      this.loadCodeConfig();
    }
  },
  methods: {
    loadCodeConfig () {
      fetch(JsonConfig.NationCodeFlag).then(res => res.json()).then(res => {
        this.filtered = res;
        this.allOptions = res.slice();
        this.form.code = 'FR';
      });
    },
    confirm () {
      const form = this.$refs.form;
      if (!form) return;
      form.validate?.(valid => {
        if (!valid) return;
        const code = this.nationCodeOptions.find(it => it.code === this.form.code)?.dial_code ?? '';
        this.$emit('confirm', { ...this.form, code });
      });
    },
    filterBySearch (query) {
      if (query !== '') {
        this.filtered = this.allOptions.filter(it => it.dial_code?.includes(query));
      } else {
        this.filtered = this.allOptions.slice();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  overflow: hidden;
  width: 100%;
  .titles {
    font-size: 16px;
    margin-left: 120px;
    .item {
      display: flex;
      margin-bottom: 8px;
      align-items: center;
      > span {
        display: inline-block;
      }
      .label {
        width: 120px;
      }
      .text {
        font-weight: bold;
      }
    }
  }
  .form {
    .phone-form {
      display: flex;
    }
  }
}
.qianlan {
  background-color: #234dd4;
}
</style>
