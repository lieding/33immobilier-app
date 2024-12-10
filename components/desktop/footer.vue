<template>
  <section class="footer flex-column full-w border-box white">
    <div class="content">
      <div class="row-1 flex justify-between">
        <div class="left">
          <img src="/33immo-logo.png" />
        </div>
        <div class="right flex">
          <div class="list" v-for="it, idx in list" :key="idx">
            <div class="list-title">{{ it.title }}</div>
            <div v-for="itt, idxx in it.items" :key="idxx" class="list-item">
              {{ itt.title }}
            </div>
            <div v-if="idx === 0" class="whatsapp-btn pointer flex align-center" @click="whatsappClickHandler">
              <img src="/whatsapp.svg" />
              <span class="inline-block txt white bold">{{ $t('message.global.CONTACT_US') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row-2">©2024 Micco immo, Everest Finance</div>
      <div class="row-3">{{ $t('message.FOOTER.DESC') }}</div>
      <div class="row-4">
        <span>{{ $t('message.FOOTER.PRIVACY') }}</span>
        <span>{{ $t('message.FOOTER.COOKIE') }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="js">
const Service = {
  title: 'message.global.SERVICE',
  items: [
    { i18n: 'message.global.NEW_PROGRAME' },
    { i18n: 'message.global.SECOND_HAND' },
    { i18n: 'message.FOOTER.SCI' },
    { i18n: 'message.FOOTER.ACCOUNTING' }
  ]
};
const ContactUs = {
  title: 'message.global.CONTACT_US',
  items: [
    { i18n: 'message.FOOTER.HELP_CENTER' },
    { i18n: 'message.FOOTER.CONTACT_ASSISTANT' }
  ]
};
const Info = {
  title: 'message.FOOTER.INFO',
  items: [
    { i18n: 'message.FOOTER.PARTNER' },
    { i18n: 'message.FOOTER.EMPLOYMENT' },
    { i18n: 'message.FOOTER.NEWS_EDU' }
  ]
};
export default {
  created () {
    this.list = [
      translate.call(this, Service),
     /* translate.call(this, ContactUs),
      translate.call(this, Info)*/
    ];
  },
  methods: {
    whatsappClickHandler () {
      const aEl = document.createElement('a');
      aEl.target = '_blank';
      aEl.href = ' https://wa.me/message/PLR3FR4I7CPSO1';
      aEl.click();
    }
  }
}

function translate (obj) {
  return {
    title: this.$t(obj.title),
    items: obj.items.map(it => ({ ...it, title: this.$t(it.i18n) })),
  };
}
</script>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(180deg, #2445CD 0%, #543AF8 100%);;
  padding: 90px 0 60px;

}
.content {
  max-width: 1200px;
  margin: 0 auto;
  .row-1 {
    margin-bottom: 76px;
    .left {
      img {
        height: 120px;
      }
    }
    .right {
      .list {
        margin-right: 32px;
        &:last-child {
          margin-right: unset;
        }
        .list-title {
          font-size: 20px;
          margin-bottom: 16px;
        }
      }
      .whatsapp-btn {
      }
    }
  }
  .row-2 {
    margin-bottom: 16px;
  }
  .row-3 {
    margin-bottom: 64px;
  }
  .row-4 {
    span {
      display: inline-block;
    }
  }
}
</style>
