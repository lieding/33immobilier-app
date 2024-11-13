<template>
  <div class="seconHandHous">
    <headers class="colors"></headers>
    <div class="centerS secondBod clearfix">
      <div class="headline">
        <span>{{ $t("message.global.home") }}</span> /
        <span>{{ $t("message.global.PROGRAME_DETAIL") }}</span>
      </div>
      <div class="oductions">
        {{ $t("message.global.premisess") }}:
        {{ programeInfo.estate_name }}
      </div>
      <div class="leftBody">
        <!-- 轮播图 -->
        <div class="slideshow">
          <el-carousel :interval="5000" height="404px" arrow="always">
            <el-carousel-item
              v-for="(item, i) in programeInfo.images"
              :key="i"
            >
              <div
                class="lunbotu"
                v-bind:style="{ 'background-image': 'url(' + item + ')' }"
                @click="galleryIndex = i"
              ></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="rightBody">
        <div class="content-package">
          <p class="prises">
            {{ programeInfo.availablePropertiesMinPrice }}€ —
            {{ programeInfo.availablePropertiesMaxPrice }}€
          </p>
          <p class="block">
            <span style="background-color:#234CD3;padding:3px 8px;">
              {{ programeInfo.deliveryQuarter }}
            </span>
            <span
              style="background-color:#BFBFBF;padding:2px 3px; float:right;"
              v-for="(itemA, index) in programeInfo.tags"
              :key="index"
            >{{ itemA }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.completionDate") }}：
            <span>{{ programeInfo.deliveryQuarter }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.PROPERTIES_COUNT") }}：
            <span>{{ programeInfo.availablePropertiesCount ?? programeInfo.propertiesCount }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.measures") }}：
            <el-tooltip v-for="it in programeInfo.laws" :key="it" placement="top-end" effect="light" :content="getTranslatedLawItem(it)">
              <el-tag>{{ it }}</el-tag>
            </el-tooltip>
          </p>
          <p class="smJf">
            {{ $t("message.global.TAX_AREA") }}：
            <template v-if="translatedTaxArea">
              <span>{{ programeInfo.taxArea }}</span>
              <el-tooltip placement="top" effect="light" :content="translatedTaxArea">
                <i class="el-icon-info" />
              </el-tooltip>
            </template>
            <template v-else>
              <span>{{ programeInfo.taxArea }}</span>
            </template>
          </p>
          <p class="smJf">
            {{ $t("message.global.deductibility") }}：
            <span>{{ programeInfo.taxCutsQuota }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.LOCATION") }}：
            <span>{{ programeInfo.zip_code }}/{{programeInfo.city}}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.range") }}：
            <el-tag v-for="it in translatedTypologies" :key="it" type="success" size="mini">{{ it }}</el-tag>
          </p>
        </div>
      </div>
    </div>
    <div class="centerS contentS">
      <p class="titles">
        <span style="font-size:32px;margin-right:10px;font-weight:600;">{{
          $t("message.global.PROGRAME_DESC")
        }}</span>
      </p>
      <p style="margin-top: 10px; white-space:pre-line;">
        <div v-html="programeInfo.description"></div>
      </p>
      <p class="titles" style="margin-top:10px;">
        <span style="font-size:32px;margin-right:10px;font-weight:600;">
          {{ $t("message.global.position") }}：{{ programeInfo.address }}
        </span>
      </p>
      <div style="border: 1px solid #ccc;height:500px;width:1200px">
        <jump-map
          v-if="programeInfo.latitude && programeInfo.longitude"
          :latitude="programeInfo.latitude"
          :longitude="programeInfo.longitude"
          :interactive="false"
          :need-circle="true"
          :need-center-logo="true"
          :show-nav="true"
        ></jump-map>
      </div>
      <p class="titles" style="margin-top:10px;padding-bottom:20px;">
        <span style="font-size:32px;margin-right:10px;font-weight:600;">{{
          $t("message.global.PROPERTY_DETAILS")
        }}</span>
      </p>
      <el-table
        :empty-text="$t('message.global.zanwushuju')"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="number"
          :label="$t('message.global.chamberNum')"
        ></el-table-column>
        <el-table-column
          prop="typology"
          :label="$t('message.global.DoorMode')"
        ></el-table-column>
        <el-table-column
          prop="surface"
          :label="$t('message.global.USABLE_AREA')"
        ></el-table-column>
        <el-table-column
          prop="floor"
          :label="$t('message.global.FLOOR')"
        ></el-table-column>
        <el-table-column
          prop="price"
          :label="$t('message.global.price')"
        ></el-table-column>
        <el-table-column
          prop="rentPrice"
          :label="$t('message.global.estimate')"
        ></el-table-column>
        <el-table-column
          prop="profitability"
          :label="$t('message.global.ROI')"
        ></el-table-column>
        <el-table-column :label="$t('message.global.floorPlan')">
          <template slot-scope="scope">
            <el-link :href="scope.planLink" target="'_blank'">Plan</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="data" :label="$t('message.global.CONTACT_US')">
          <template slot-scope="scope">
            <span
              style="color:#224BD7;cursor: pointer;text-decoration:underline;"
              @click="propertyItemClickhandler(scope.row)"
            >{{ $t("message.global.CONTACT_US") }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="centerS">
      <calculator></calculator>
    </div>
    <div class="centerS" style="margin-top:20px;" v-show="promoteList.length">
      <div style="font-size:32px;font-weight:600;">
        {{ $t("message.global.Recommended") }}
      </div>
      <div class="recommendation-section">
        <div class="recommendation-item" v-for="(item, index) in promoteList" :key="index">
          <div style="position:relative;">
            <img
              @click="routerGo(item.promoteId)"
              style="width:244px;height:144px;"
              :src="item.promoteShowUrl"
              alt=""
            />
            <p style="position:absolute;bottom:10px;padding-left:5px;">
              <span
                v-show="item.promoteTaxCuts"
                style="padding:3px 9px;
                            font-size:12px;
                            color:#fff;
                            background-color:#6AC078;
                            font-weight:600;
                            margin-right:4px;"
              >
                {{ item.promoteTaxCuts }}
              </span>
              <span
                v-show="item.promoteExpressing"
                style="padding:3px 9px;
                            font-size:12px;
                            color:#fff;
                            font-weight:600;
                            background-color:#234CD3"
              >
                {{ item.promoteExpressing }}
              </span>
            </p>
          </div>
          <p
            class="huodian"
            style="font-size:18px;color:rgba(80,80,80,1);padding-left:10px;"
          >
            {{ item.promoteEstate }}
          </p>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              src="~/assets/image/dingwei.png"
              alt=""
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;">{{ item.promoteProvince }}/{{ item.promoteCity }}</span>
          </div>
          <div style="padding-top:5px;">
            <img
              style="width:13px;height:15px;padding-left:10px;vertical-align: middle;"
              src="~/assets/image/apartment.png"
              alt=""
            />&nbsp;
            <span style="font-size:14px;color:#A1A1A1;vertical-align: middle;"
              >{{ item.promoteMinHall }} - {{ item.promoteMaxHall }}
              {{ $t("message.global.P") }}
            </span>
          </div>
          <div style="padding-top:5px;">
            <span
              v-for="(tags, i) in item.tags"
              :key="i"
              style="display:inline-block;padding:3px 7px;font-size:10px;color:#fff;background-color:#BFBFBF;margin-left:10px;"
            >{{ tags }}</span>
          </div>
          <div
            style="font-size:16px;
                    color:#FF5E5E;
                    padding-left:10px;
                    font-weight:600;
                    padding-top:3px;"
          >
            {{ item.promoteLowPrice }} - {{ item.promoteMaxPrice }}€
          </div>
        </div>
      </div>
    </div>
    <foots></foots>
    <client-only>
      <gallery
        :images="programeInfo.images"
        :index="galleryIndex"
        @close="galleryIndex = null"
      ></gallery>
      <contact-dialog
        :visible="contactDialogVisible"
        :titles="contactDialogTitles"
        :confirm-btn-loading="postApplicationLoading"
        @close="contactDialogVisible = false"
        @confirm="contactFormConfirmHandler"
      />
    </client-only>
  </div>
</template>

<script>
import headers from "~/components/PcIndex/header.vue";
import foots from "~/components/PcIndex/foot.vue";
import Calculator from "~/components/PcIndex/calculator.vue";

import JumpMap from '~/components/jumpMap.vue';
import ContactDialog from '../components/PcIndex/ContactDialog.vue';
import { TypologyOptionConfig, extractProgramProperty, PostApplicationMode } from '../common/config';

export default {
  name: "newDetails",
  middleware: "responsive",
  components: {
    headers,
    foots,
    Calculator,
    JumpMap,
    ContactDialog,
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
      programeInfo: {},
      promoteList: [],
      translatedTypologies: [],
      contactDialogVisible: false,
      contactDialogTitles: [],
      tableData: [],
      galleryIndex: null,
      translatedTaxArea: null,
      postApplicationLoading: false,
    };
  },
  created () {
    this.getTranslatedLawItem = (law) => this.$t(`message.PROGRAME_DETAIL.LAW_ITEM["${law}"]`);
  },
  mounted () {
    if (process.client) this.queryDetail();
  },
  methods: {
    async queryDetail () {
      const lang = this._i18n.locale;
      const { zip_code, name_id } = this.$route.query;
      try {
        const res = await this.$api.article.getInfoNewHous({ zip_code, name_id, lang });
        const { properties, typologies, taxArea } = res.data;
        if (Array.isArray(properties)) {
          for (const it of properties) {
            it.price = it.prices?.[0]?.price;
            it.rentPrice = it.prices?.[0]?.monthlyRent;
            it.planLink = it.plan?.url;
            it.profitability = it.prices?.[0]?.profitability;
          }
        }
        this.TypologyI18NConfig = TypologyOptionConfig.map(({ incluedKey, I18NKey }) =>
          ({ incluedKey, label: this.$t(`message.NEW_LIST.${I18NKey}`) })
        );
        const translatedTypologies = typologies
          .map(it => it.toLowerCase())
          .map(it => this.TypologyI18NConfig.find(itt => it.includes(itt.incluedKey))?.label)
          .filter(Boolean);
        const translatedTaxArea =
          taxArea ? this.$t(`message.PROGRAME_DETAIL.TAX_AREA.${taxArea.toUpperCase()}`) : null;
        Object.assign(this, {
          programeInfo: res.data,
          tableData: properties,
          translatedTypologies,
          translatedTaxArea,
        });
      } catch (e) {
        console.error('query detail: ', e);
      }
    },
    routerGo(flags) {
      if (process.client) {
        this.get(flags);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    propertyItemClickhandler (property) {
      this.contactDialogTitles = extractProgramProperty.call(this, property);
      this.contactDialogVisible = true;
      this.__selectedProperty = property;
    },
    contactFormConfirmHandler (contact) {
      const property = this.__selectedProperty;
      if (!property) return;
      const propertyId = property.id, programeId = this.programeInfo.id;
      if (!programeId || !propertyId) return;
      this.postApplicationLoading = true;
      const lang = this._i18n.locale;
      this.$api.article.postApplication({ mode: PostApplicationMode.PROGRAME_PROPERTY, lang, contact, programeId, propertyId })
        .then(() => {
          this.contactDialogVisible = false;
          this.$notify({ title: 'Success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS'), type: 'success' });
        })
        .catch(console.error)
        .finally(() => this.postApplicationLoading = false);
    }
  }
};
</script>

<style lang="scss" scoped>
.huodian {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.colors {
  color: #000 !important;
}
// 轮播图
.lunbotu {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.secondBod {
  padding-bottom: 12px;
  .headline {
    padding-top: 10px;
    color: #000;
    font-size: 16px;
    span {
      cursor: pointer;
    }
  }
  .oductions {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    padding: 16px;
    padding-bottom: 30px;
  }
  // 左侧主题
  .leftBody {
    float: left;
    width: 710px;
    // 轮播图
    .slideshow {
      text-align: center;
      .el-carousel__item img {
        // width: 710px;
        height: 404px;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
  .rightBody {
    float: right;
    width: 455px;
    .content-package {
      box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
      padding: 9px 20px;
      .prises {
        font-size: 26px;
        font-weight: 600;
        color: #ff5e5e;
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .block {
        margin-top: 4px;
        span {
          display: inline-block;
          color: #fff;
          margin-right: 8px;
        }
      }
    }
    .smJf {
      margin-top: 6px;
      color: #bababa;
      font-weight: 600;
      font-size: 16px;
      span {
        color: #000000;
      }
    }
  }
}
.recommendation-section {
  margin-bottom: 20px;
  padding-top: 30px;
  .recommendation-item {
    width: 244px;
    height: 285px;
    display: inline-block;
    margin-right: 56px;
    box-sizing: border-box;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
  }
}
.contentS {
  margin-top: 10px;
  .contentS {
    span {
      display: inline-block;
    }
  }
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
</style>
<style lang="scss">
.contentS {
  .el-table thead {
    font-size: 16px;
  }
}
</style>
