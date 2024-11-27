<template>
  <div>
    <van-popup v-model="visible" position="bottom" closeable style="height:max-content" :close-on-click-overlay="false" @close="$emit('close')">
      <div class="content">
        <van-cell-group inset>
          <van-cell v-for="it in titles" :key="it.label" :title="it.label" :value="it.text" />
        </van-cell-group>
        <van-form validate-first @submit="validHandler">
          <van-field
            v-model="form.firstName"
            name="firstName"
            :label="$t('message.global.FIRST_NAME')"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            :rules="[{ required: true, message: $t('message.global.PLEASE_ENTER') }]"
          />
          <van-field
            v-model="form.lastName"
            name="lastName"
            :label="$t('message.global.LAST_NAME')"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            :rules="[{ required: true, message: $t('message.global.PLEASE_ENTER') }]"
          />
          <van-field
            v-model="form.mail"
            name="mail"
            :label="$t('message.global.EMAIL_ADDRESS')"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            :rules="[{ required: true, message: $t('message.global.PLEASE_ENTER') }]"
          />
          <van-field
            readonly
            v-model="form.code"
            :label="$t('message.global.COUNTRY_CODE')"
            name="code"
            @click="codePickerVis = true"
          />
          <van-field
            v-model="form.phone"
            name="phone"
            :label="$t('message.global.YOUR_PHONE')"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            :rules="[{ required: true, message: $t('message.global.PLEASE_ENTER') }]"
          />
          <van-field
            v-model="form.message"
            :label="$t('message.global.LEAVE_YOUR_MESSAGE')"
            name="message" rows="1" autosize
            :placeholder="$t('message.global.PLEASE_ENTER')"
          />
          <div style="flex:1"> </div>
          <div class="submit-btn">
            <van-button round block type="info" native-type="submit" :loading="confirmBtnLoading">{{ $t('message.global.CONFIRM') }}</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
    <van-popup v-model="codePickerVis" position="bottom" style="z-index: 1000;">
      <van-picker
        show-toolbar
        :columns="nationCodeStrs"
        :confirm-button-text="$t('message.global.CONFIRM')"
        :cancel-button-text="$t('message.global.CANCEL')"
        @cancel="codePickerVis = false" @confirm="phoneCodeConfirm" />
    </van-popup>
  </div>
</template>

<script>
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
    },
  },
  data () {
    return {
      codePickerVis: false,
      nationCodeOptions: [],
      nationCodeStrs: [],
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
    phoneCodeConfirm (_, idx) {
      const code = this.nationCodeOptions[idx]?.dial_code;
      if (code) this.form.code = code;
    },
    loadCodeConfig () {
      fetch(JsonConfig.NationCodeFlag).then(res => res.json()).then(res => {
        this.nationCodeOptions = res;
        this.nationCodeStrs = res.map(({ flag, dial_code }) => `${flag} ${dial_code}`);
        this.form.code = 'FR';
      });
    },
    validHandler () {
      console.log(this.form);
      this.$emit('confirm', { ...this.form });
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  margin: 0 .06rem;
  padding: .3rem 0 .1rem;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
}
.form {
  display: flex;
  flex-direction: column;
}
form.van-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
