<template>
  <div>
    <div class="desktop-placed-center top-section">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/pc_index' }">{{ $t("message.global.HOME") }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t("message.global.PROGRAME_DETAIL") }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="estate-name-title">
        {{ $t("message.global.PROGRAM_NAME") }}: {{ programeInfo.estate_name }}
      </div>
    </div>
    <div class="desktop-placed-center flex">
      <div class="left-body">
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
      <div class="right-body">
        <div class="content-package">
          <p class="prises">
            {{ fmoney(programeInfo.availablePropertiesMinPrice) }}€ — {{ fmoney(programeInfo.availablePropertiesMaxPrice) }}€
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
            {{ $t("message.global.DELIVERY_DATE") }}：
            <span>{{ programeInfo.deliveryQuarter }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.PROPERTIES_COUNT") }}：
            <span>{{ programeInfo.availablePropertiesCount ?? programeInfo.propertiesCount }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.TAX_CUTS") }}：
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
            {{ $t("message.global.TAX_REDUCTION_AMOUNT") }}：
            <span>{{ programeInfo.taxCutsQuota }}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.LOCATED_CITY") }}：
            <span>{{ programeInfo.zip_code }} / {{programeInfo.city}}</span>
          </p>
          <p class="smJf">
            {{ $t("message.global.TYPOLOGIES") }}：
            <el-tag v-for="it in translatedTypologies" :key="it" type="success" size="mini">{{ it }}</el-tag>
          </p>
        </div>
      </div>
    </div>
    <div class="desktop-placed-center content-section">
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
          {{ $t("message.global.PROGRAM_POSITION") }}：{{ programeInfo.address }}
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
        :empty-text="$t('message.global.EMPTY')"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="number"
          :label="$t('message.global.PROPERTY_NUMBER')"
        ></el-table-column>
        <el-table-column
          prop="typology"
          :label="$t('message.global.APARTMENT_TYPE')"
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
          :label="$t('message.global.PRICE')"
        ></el-table-column>
        <el-table-column
          prop="rentPrice"
          :label="$t('message.global.ESTIMATED_MONTHLY_RENT')"
        ></el-table-column>
        <el-table-column
          prop="profitability"
          :label="$t('message.global.RATE_OF_RETURN')"
        ></el-table-column>
        <el-table-column :label="$t('message.global.FLOOR_PLAN')">
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
    <div class="desktop-placed-center">
      <calculator></calculator>
    </div>
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
import Calculator from "~/components/desktop/calculator.vue";
import JumpMap from '~/components/jumpMap.vue';
import ContactDialog from '../components/desktop/ContactDialog.vue';
import { TypologyOptionConfig, extractProgramProperty, PostApplicationMode } from '../common/config';
import { fmoney } from '../utils';

export default {
  name: "newDetails",
  middleware: "responsive",
  components: {
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
    this.fmoney = fmoney;
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
        const res = await this.$api.article.getProgrameDetail({ zip_code, name_id, lang });
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
// 轮播图
.lunbotu {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.top-section {
  padding-bottom: 12px;
  .breadcrumb {
    padding-top: 10px;
  }
  .estate-name-title {
    color: #000;
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    margin: 16px 0 30px;
  }
}
// 左侧主题
.left-body {
  width: 710px;
  // 轮播图
  .slideshow {
    text-align: center;
    .el-carousel__item img {
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
.right-body {
  width: 455px;
  height: 404px;
  .content-package {
    box-shadow: 0px 2px 26px 0px rgba(0, 0, 0, 0.11);
    padding: 9px 20px;
    height: inherit;
    box-sizing: border-box;
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
.content-section {
  margin-top: 10px;
  .content-section {
    span {
      display: inline-block;
    }
  }
}
</style>
<style lang="scss">
.content-section {
  .el-table thead {
    font-size: 16px;
  }
}
</style>
