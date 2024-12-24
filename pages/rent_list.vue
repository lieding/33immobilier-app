<template>
  <div class="page-wrapper">
    <div class="desktop-placed-center">
      <el-skeleton animated class="full-w" v-if="loading" />
      <el-card v-else>
        <el-table :data="tableData" @row-click="rowClickHandler" style="width: 100%;" >
          <el-table-column prop="title" :label="$t('message.global.TITLE')"/>
          <el-table-column :label="$t('message.PAGE_QUESTINNAIRE.RENT_TYPE')">
            <template slot-scope="scope">
              <span>{{ RentTypeConfig[scope.row.rentType] }}</span>
              <span v-if="scope.row.rentType === 'SHARING'">({{ scope.row.rooms.length }})</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE')">
            <template slot-scope="scope">
              <span>{{ ResidenceTypeConfig[scope.row.residenceType] }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('message.global.PRICE')">
            <template slot-scope="scope">
              <span v-if="checkArrLenGreaterThan1(scope.row.pureRentRange)">
                {{ scope.row.pureRentRange[0] }}€ - {{ scope.row.pureRentRange[1] }}€
              </span>
              <span v-else-if="scope.row.pureRentRange">{{ scope.row.pureRentRange[0] }}€</span>
              <span v-else>{{ scope.row.pureRent }}€</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('message.PAGE_RENT.DEPOSIT')">
            <template slot-scope="scope">
              <span v-if="checkArrLenGreaterThan1(scope.row.depositRange)">
                {{ scope.row.depositRange[0] }}€ - {{ scope.row.depositRange[1] }}€
              </span>
              <span v-else-if="scope.row.depositRange">{{ scope.row.depositRange[0] }}€</span>
              <span v-else>{{ scope.row.deposit }}€</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('message.global.SURFACE')">
            <template slot-scope="scope">
              <span v-if="checkArrLenGreaterThan1(scope.row.surfaceRange)">
                {{ scope.row.surfaceRange[0] }}m² - {{ scope.row.surfaceRange[1] }}m²
              </span>
              <span v-else-if="scope.row.surfaceRange">{{ scope.row.surfaceRange[0] }}m²</span>
              <span v-else>{{ scope.row.surface }}m²</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button v-if="scope.row.images && scope.row.images.length" type="text" icon="el-icon-view" @click.stop="imagePreview(scope.row)">
                {{ $t('message.global.PHOTOS') }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column width="60px" v-if="isDesktop">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteRent(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <client-only>
      <gallery
        :images="previewImages"
        :index="galleryIndex"
        @close="galleryIndex = null"
      />
    </client-only>
  </div>
</template>

<script lang="js">
import { createNamespacedHelpers } from 'vuex';
import { checkArrLenGreaterThan1, createPath } from '../utils';
import rem from "~/common/rem.js";
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      previewImages: [],
      galleryIndex: null,
    };
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    ...mapGetters(['curAuthInfo']),
  },
  created () {
    this.RentTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS');
    this.ResidenceTypeConfig = this.$t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE_OPTS');
    this.checkArrLenGreaterThan1 = checkArrLenGreaterThan1;
  },
  mounted () {
    if (this.isMobile) rem();
    if (process.client) {
      setTimeout(this.checkCurrentAuth, 8 * 1000);
      this.queryList();
    }
  },
  methods: {
    checkCurrentAuth () {
      if (this.curAuthInfo) return;
      this.$confirm(this.$t('message.global.AUTH_NOT_ALLOWED'), 'Error', {
        confirmButtonText: this.$t('message.global.LOGIN'),
        type: 'warning',
        showClose: false,
        showCancelButton: false
      })
        .then(() => {
          this.$router.replace({ path: createPath('/login_register') });
        });
    },
    queryList () {
      this.loading = true;
      this.$api.article.searchRentsByUserId()
        .then(res => {
          this.tableData = res.data;
          this.loading = false;
        })
        .catch(console.error)
    },
    rowClickHandler (rentDetail) {
      const { user_id } = this.curAuthInfo;
      const { id, title } = rentDetail;
      if (!user_id && !id) return;
      this.$router.replace({ path: createPath('/rent_detail'), query: { user_id, id, title } });
    },
    imagePreview (rentDetail) {
      this.previewImages = rentDetail.images.map(it => it.downloadUrl);
      this.galleryIndex = 0;
    },
    deleteRent (rentDetail) {
      this.$confirm(this.$t('message.PAGE_RENT.DELETE_WARNING'), 'Warning', {
        confirmButtonText: this.$t('message.global.CONFIRM'),
        cancelButtonText: this.$t('message.global.CANCEL'),
        type: 'warning'
      }).then(() => {

      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 24px 0 36px;
}
</style>
