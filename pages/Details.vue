<!-- <script src="../../main.js"></script>-->
<template>
  <div>
    <client-only>
      <Header :title="$t('message.global.NEW_PROGRAME_DETAIL')" />
      <div>
        <div class="images" @click="dialogVisible = true">
          <van-swipe
            :autoplay="3000"
            @change="onChange"
            :show-indicators="false"
          >
            <van-swipe-item v-for="(image, index) in picList" :key="index">
              <img :src="image" @click="galleryIndex = i" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="programe-detail">
        <p class="detail-title">{{ programeDetail.estate_name }}</p>
        <p class="detail-region">{{ programeDetail.zip_code }}/{{ programeDetail.city }}</p>
        <p class="item">
          <span class="check font" v-if="programeDetail.deliveryQuarter">{{ programeDetail.deliveryQuarter }}</span>
          <span class="itemize font1" v-for="(it) in translatedTypologies" :key="it">{{ it }}</span>
        </p>
        <p class="price">{{ programeDetail.availablePropertiesMinPrice }}€ - {{ programeDetail.availablePropertiesMaxPrice }}€</p>
        <p class="hand">
          <span class="time">{{ $t("message.global.completionDate") }} ：</span>
          {{ programeDetail.deliveryQuarter }}
        </p>
        <p class="hand">
          <span class="time">{{ $t("message.global.PROPERTIES_COUNT") }} ：</span>
          {{ programeDetail.availablePropertiesCount }}
        </p>
        <p class="hand">
          <span class="time">{{ $t("message.global.measures") }} ：</span>
          {{ translatedLaws }}
        </p>
        <p class="hand">
          <span class="time">{{ $t("message.global.TAX_AREA") }} ：</span>
          {{ translatedTaxArea }}
        </p>
        <p class="hand">
          <span class="time">{{ $t("message.global.LOCATION") }} ：</span>
          {{ programeDetail.zip_code }}/{{ programeDetail.city }}
        </p>
      </div>
      <hr class="hr" />
      <!-- 房产顾问 -->
      <div class="estates">
        <p class="consultants">{{ $t("message.global.CONSULTANT") }}</p>
        <div class="broker_box">
          <div class="broker">
            <img :src="brokerInfo.brokerAvatar" alt class="img" />
            <div>
              <p class="name">{{ brokerInfo.brokerName }}</p>
              <p class="agent">{{ brokerInfo.brokerJob }}</p>
            </div>
            <div class="attestation">
              <p>
                <img src="~/assets/image/autonym.png" alt />
                <span>{{ $t("message.global.authentication") }}</span>
              </p>
              <p>
                <img src="~/assets/image/licensed.png" alt />
                <span>{{ $t("message.global.licensed") }}</span>
              </p>
              <p>
                <img src="~/assets/image/pro.png" alt />
                <span>{{ $t("message.global.EasyPro") }}</span>
              </p>
            </div>
          </div>
          <hr />
          <div class="num">
            <p class="phone" v-if="brokerInfo.brokerTelPhone">
              <img src="~/assets/image/phone1.png" alt class="margin" />
              {{ brokerInfo.brokerTelPhone }}
            </p>
            <p>
              <span class="wx" v-if="brokerInfo.wxNumber">{{ $t("message.global.WXWach") }}:{{ data.wxNumber }}</span>
              <span class="yx" v-if="brokerInfo.brokerEmail">{{ $t("message.global.mail") }}：{{ brokerInfo.brokerEmail }}</span>
            </p>
          </div>
          <div class="quiz">
            <div class="drug">
              <van-cell-group>
                <van-field
                  v-model="contactForm.name"
                  :placeholder="$t('message.global.YourName')"
                  left-icon="contact"
                />
              </van-cell-group>
              <van-cell-group>
                <van-field
                  v-model="contactForm.phone"
                  :placeholder="$t('message.global.YourPhone')"
                  left-icon="phone-o"
                />
              </van-cell-group>
              <van-cell-group>
                <van-field
                  v-model="contactForm.mail"
                  :placeholder="$t('message.global.EMAIL_ADDRESS')"
                  left-icon="envelop-o"
                />
              </van-cell-group>
            </div>
            <van-cell-group>
              <van-field
                v-model="contactForm.message"
                type="textarea"
                :placeholder="$t('message.global.LeaveYourMessage')"
                autosize
                :border="false"
              />
            </van-cell-group>
            <van-button type="primary" class="btn_us" @click="OncontactUs">{{ $t("message.global.woyaotiwen") }}</van-button>
          </div>
        </div>
      </div>
      <hr class="hr" />
      <!-- 楼盘介绍 -->
      <div class="estates pack">
        <div class="top">
          <div>
            <span class="consultants">{{ $t("message.global.PROGRAME_DESC") }}</span>
          </div>
        </div>
        <div
          :class="displayMoreDesc ? 'synopsisno' : 'synopsis'"
          style="white-space:pre-line;"
          v-html="programeDetail.description"
        ></div>
        <div>
          <span class="packUp" @click="toggleDisplayMore">
            {{ displayMoreDesc ? $t("message.global.seeMore") : $t("message.global.SEE_LESS") }}
          </span>
        </div>
      </div>
      <hr class="hr" />
      <!-- 楼盘位置 -->
      <div class="estates">
        <span class="consultants">{{ $t("message.global.position") }}</span>
        <p class="province">{{ programeDetail.address }}</p>
        <div class="map">
          <jump-map
            v-if="programeDetail.latitude && programeDetail.longitude"
            :latitude="programeDetail.latitude"
            :longitude="programeDetail.longitude"
            :interactive="false"
            :need-circle="true"
            :need-center-logo="true"
          ></jump-map>
        </div>
      </div>
      <hr class="hr" />
      <!-- 户型详情 -->
      <div class="estates" v-show="properties.length != 0">
        <span class="consultants">{{ $t("message.global.PROPERTY_DETAILS") }}</span>
        <div class="swipe">
          <div v-for="(info, index) in properties" :key="index">
            <p class="hand">
              <span class="time">{{ $t("message.global.chamberID") }} ：</span>
              {{ info.number }}
            </p>
            <p class="hand">
              <span class="time">{{ $t("message.global.DoorMode") }} ：</span>
              {{ info.translatedTypology }}
            </p>
            <p class="hand">
              <span class="time">{{ $t("message.global.USABLE_AREA") }} ：</span>
              {{ info.surface }}
            </p>
            <p class="hand">
              <span class="time">{{ $t("message.global.FLOOR") }} ：</span>
              {{ info.floor }}
            </p>
            <p class="hand">
              <span class="time">{{ $t("message.global.price") }} ：</span>
              {{ info.price }}€
            </p>
            <p class="hand">
              <span class="time">{{ $t("message.global.ROI") }} ：</span>
              {{ info.profitability }}%
            </p>
          </div>
        </div>
        <hr class="hr" />
      </div>
      <Calculator />
      <hr class="hr" />
      <div class="estates" v-if="promoteList">
        <span class="consultants">{{ $t("message.global.Recommended") }}</span>
        <list :promoteList="promoteList" type="new" />
      </div>
      <van-button type="info" size="large" @click="toOrderIssuePage">{{$t("message.global.SELLING_APPLICATION")}}</van-button>
      <Footer />
      <gallery
        :images="picList"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
    </client-only>
  </div>
</template>

<script>
import rem from "~/common/rem.js";
import Header from "~/components/Mindex/head.vue";
import Footer from "~/components/Mindex/footer.vue";
import List from "~/components/Mindex/list.vue";
import JumpMap from '~/components/jumpMap.vue';
import { TypologyOptionConfig } from '../common/config';
import Calculator from '../components/Mindex/calculator.vue';

export default {
  name: "Details",
  middleware: "responsive",
  components: {
    Header,
    Footer,
    List,
    JumpMap,
    Calculator,
  },
  head() {
    const { estate_name, city } = this.$route.query;
    return {
      title: `${estate_name} (${city})`,
      meta: [
        {
          name: "description",
          content: `${estate_name} (${city})`
        },
        {
          name: "keywords",
          content: `法国新房,法国楼盘,买房投资,买房减税,PINEL减税,LMNP减税,VEFA,Logement neuf,${estate_name},${city}`
        },
      ]
    };
  },
  data() {
    return {
      programeDetail: {},
      dialogVisible: false,
      contactForm: {
        name: '',
        phone: '',
        mail: '',
        message: '',
      },
      picList: [], //图片集合
      promoteList: [], //推荐房源
      properties: [], //户型集合
      displayMoreDesc: true,
      brokerInfo: {},
      swipeIdx: 0,
      galleryIndex: null,
      translatedTypologies: [],
      translatedTaxArea: '',
      translatedLaws: '',
    };
  },
  mounted() {
    rem();
    if (process.client) this.queryDetail();
  },
  methods: {
    async queryDetail () {
      const lang = this._i18n.locale;
      const { zip_code, name_id } = this.$route.query;
      this.TypologyI18NConfig = TypologyOptionConfig.map(({ incluedKey, I18NKey }) =>
        ({ incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) })
      );
      try {
        const res = await this.$api.article.getInfoNewHous({ zip_code, name_id, lang });
        const { properties, typologies, taxArea, laws } = res.data;
        if (Array.isArray(properties)) {
          for (const it of properties) {
            it.price = it.prices?.[0]?.price;
            it.rentPrice = it.prices?.[0]?.monthlyRent;
            it.planLink = it.plan?.url;
            it.profitability = it.prices?.[0]?.profitability;
            it.translatedTypology = this.TypologyI18NConfig.find(itt =>
              it.typology?.toLowerCase().includes(itt.incluedKey))?.label
          }
        }
        const translatedTypologies = typologies
          .map(it => it.toLowerCase())
          .map(it => this.TypologyI18NConfig.find(itt => it.includes(itt.incluedKey))?.label)
          .filter(Boolean);
        const translatedTaxArea =
          taxArea ? this.$t(`message.PROGRAME_DETAIL.TAX_AREA.${taxArea.toUpperCase()}`) : null;
        const translatedLaws = laws.map(it => this.$t(`message.PROGRAME_DETAIL.LAW_ITEM["${it}"]`)).join(',')
        Object.assign(this, {
          programeDetail: res.data,
          picList: res.data.images,
          properties,
          translatedTypologies,
          translatedTaxArea,
          translatedLaws,
        });
      } catch (e) {
        console.error('query detail: ', e);
      }
    },
    onChange(index) {
      this.swipeIdx = index;
    },
    toggleDisplayMore() {
      this.displayMoreDesc = !this.displayMoreDesc;
    },
    OncontactUs() {
      let params = { ...this.contactForm };
      this.$api.article.contactUs(params).then(res => {
        this.$toast(res.data.msg);
      });
    },
    toOrderIssuePage() {
      this.$router.push({ path: '/ordIssue', query: { type: "second_hand" } });
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  img {
    width: 100%;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
div {
  font-size: 16px;
}
.pack {
  padding: 0.1rem;
  div {
    .packUp {
      float: right;
      font-size: 0.13rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(35, 76, 211, 1);
      line-height: 0.18rem;
    }
  }
}

.images {
  height: 2.14rem;
  position: relative;
  img {
    height: 2.14rem;
    width: 100%;
  }
}
.hr {
  border: none;
  height: 1px;
  margin: 0.12rem 0;
  background-color: #ececec;
}
th,
td {
  border: none !important;
}
.btn_us {
  float: right;
  height: 0.4rem;
}
.van-button--large {
  width: 92%;
  margin-left: 0.1rem;
  margin-bottom: 0.3rem;
  background: rgba(35, 76, 211, 1);
}
.programe-detail {
  position: relative;
  margin-left: 0.12rem;
  .detail-title {
    width: 70%;
    font-size: 0.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 0.28rem;
    margin: 0.07rem 0 0.03rem;
  }
  .detail-region {
    height: 0.17rem;
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
    line-height: 0.17rem;
    margin-bottom: 0.11rem;
  }
}
.tax {
  height: 0.26rem;
  background: rgba(106, 192, 120, 1);
}
.check {
  height: 0.26rem;
  background: rgba(35, 76, 211, 1);
}
.itemize {
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
}

.item > span {
  margin-right: 0.08rem;
}
.font {
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  display: inline-block;
  padding: 0 0.05rem;
  line-height: 0.26rem;
}
.font1 {
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
  display: inline-block;
  padding: 0 0.05rem;
  line-height: 0.18rem;
}
.price {
  height: 0.28rem;
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.28rem;
  padding: 0.13rem 0 0.1rem 0;
}
.hand {
  height: 0.22rem;
  font-size: 0.14rem;
  font-weight: 600;
  line-height: 0.2rem;
  margin-bottom: 0.03rem;
  padding-left: 0.1rem;
  padding-top: 0.01rem;
}
.time {
  color: rgba(186, 186, 186, 1);
}
.consultants {
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.76);
  margin-right: 0.1rem;
}
/* 房产顾问 */
.estates {
  margin: 0 0.12rem;
  .broker_box {
    padding: 0.11rem 0.15rem 0.09rem 0.04rem;
    height: 3.73rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.01rem 0.18rem 0px rgba(0, 0, 0, 0.11);
    position: relative;
    hr {
      margin-top: 0.2rem;
    }
    .broker {
      display: flex;
      .attestation {
        position: absolute;
        right: 0.2rem;

        p {
          height: 0.23rem;
          background: rgba(248, 248, 248, 1);
          border: 0.01rem solid rgba(237, 237, 237, 1);
          padding: 0 0.11rem;
          line-height: 0.23rem;
          margin-bottom: 0.05rem;
          img {
            width: 0.17rem;
            height: 0.12rem;
            display: inline-block;
            vertical-align: middle;
          }
        }
        span {
          font-size: 0.11rem;
          color: rgba(38, 38, 38, 1);
          // line-height:.11rem;
        }
      }

      .img {
        width: 0.62rem;
        height: 0.62rem;
        border-radius: 50%;
        padding: 0.07rem 0.08rem 0 0.06rem;
      }
      .name {
        padding-top: 0.1rem;
        height: 0.22rem;
        font-size: 0.16rem;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.76);
        line-height: 0.22rem;
      }
      .agent {
        height: 0.33rem;
        width: 1.5rem;
        overflow: hidden;
        font-size: 0.13rem;
        color: rgba(131, 131, 131, 0.76);
        line-height: 0.18rem;
      }
    }
    .num {
      //  height:.20rem;
      height: 0.5rem;
      margin: 0.07rem 0 0.04rem 0;
      font-size: 0.14rem;
      // font-weight:600;
      color: rgba(146, 146, 146, 1);
      line-height: 0.2rem;
      .phone {
        text-align: center;
      }
      .margin {
        margin-right: 0.06rem;
      }
      .wx {
        float: left;
      }
      .yx {
        float: right;
      }
    }
    .drug {
      .van-cell-group {
        height: 0.28rem;
      }
      .van-cell {
        padding: 0.03rem 0.1rem;
      }
    }

    .van-field__control {
      font-size: 0.12rem;
      color: rgba(167, 167, 167, 1);
      line-height: 0.23rem;
    }
    .van-cell-group {
      height: 0.59rem;
      margin: 0.07rem 0.11rem;
      background: rgba(240, 240, 240, 1);
    }
    .van-cell {
      background: none;
    }
    .btn {
      margin: 0.03rem 0.11rem;
      padding: 0 0.5rem;
      float: right;
    }
  }
  .download {
    img {
      width: 16px;
    }
  }
  .synopsis {
    margin: 0.1rem 0;
    font-size: 0.13rem;
    color: rgba(70, 70, 70, 1);
    line-height: 0.18rem;
    overflow: hidden;
  }
  .synopsisno {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    margin: 0.1rem 0;
    font-size: 0.13rem;
    color: rgba(70, 70, 70, 1);
    line-height: 0.18rem;
    overflow: hidden;
  }
  // 楼盘位置
  .province {
    font-size: 0.12rem;
    color: rgba(177, 177, 177, 1);
    line-height: 0.17rem;
  }
  .map {
    height: 3rem;
    width: 100%;
    margin-top: 0.05rem;
  }
  .swipe {
    margin-top: 0.05rem;
    white-space: nowrap; //阻止文本换行
    overflow: auto; //设置溢出可滚动
    div {
      width: 1.68rem;
      display: inline-block; //设置属性（元素间不换行）
      box-shadow: 0px 1px 18px 0px rgba(0, 0, 0, 0.11);
      padding: 0.1rem;
      margin: 0.08rem;
    }
  }
  .relation {
    text-align: center;
    height: 0.18rem;
    font-size: 0.13rem;
    color: rgba(34, 75, 215, 1);
    line-height: 0.18rem;
  }
  .money {
    padding-left: 0.2rem;
    font-weight: 500;
    color: rgba(255, 94, 94, 1);
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    span {
      display: inline-block;
    }
  }
}
</style>
<style lang="scss">
.el-dialog__wrapper dialog {
  background: #2a2a2a;
}
.dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog {
    width: 100%;
    background: none;
  }
  .van-swipe {
    top: 16%;
  }
}
.drug {
  .van-field__label {
    font-size: 0.12rem;
    color: rgba(167, 167, 167, 1);
    line-height: 0.23rem;
  }
}
</style>
