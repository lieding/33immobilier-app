<template>
  <div class="placed-center questionnaire">
    <el-form ref="form" :model="form" :rules="formRules" label-width="160px" :label-position="labelPosition">
      <!-- Basis information -->
      <template>
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.BASIS_INFO') }}</h1>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.RENT_TYPE')" prop="rentType" required>
          <el-radio-group v-model="form.rentType">
            <el-radio label="FULL">{{ $t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS.FULL') }}</el-radio>
            <el-radio label="SHARING">{{ $t('message.PAGE_QUESTINNAIRE.RENT_TYPE_OPTS.SHARING') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE')" prop="residenceType" required>
          <el-radio-group v-model="form.residenceType">
            <el-radio label="HOUSE">{{ $t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE_OPTS.HOUSE') }}</el-radio>
            <el-radio label="APPARTMENT">{{ $t('message.PAGE_QUESTINNAIRE.RESIDENCE_TYPE_OPTS.APPARTMENT') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.TITLE')" prop="title" required>
          <el-input v-model="form.title" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
        </el-form-item>
      </template>
      <el-divider />
      <!-- Address information -->
      <template>
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.ADDRESS') }}</h1>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.ADDRESS')">
          <el-autocomplete
            v-model="addressInput"
            class="full-w"
            popper-class="address-autocomplete" :debounce="1000"
            :fetch-suggestions="addressAutocompleteSearch" :placeholder="$t('message.global.PLEASE_ENTER')" @select="handleSelectAddr"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.label }}</div>
              <span class="addr">{{ item.context }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <div class="btn-row">
          <el-button type="primary" size="mini" @click="enterAddress">{{ $t('message.PAGE_QUESTINNAIRE.ENTER_MANUALLY') }}</el-button>
        </div>
        <el-form-item :label="$t('message.global.LOCATED_CITY')" prop="city" required>
          <el-input v-model="form.city" :placeholder="$t('message.global.PLEASE_ENTER')" :disabled="!addressManualInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.global.POSTAL_CODE')" prop="zip_code" required>
          <el-input v-model="form.zip_code" :placeholder="$t('message.global.PLEASE_ENTER')" :disabled="!addressManualInput"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.ADDRESS')" prop="address" required>
          <el-input v-model="form.address" :placeholder="$t('message.global.PLEASE_ENTER')" :disabled="!addressManualInput"></el-input>
        </el-form-item>
      </template>
      <el-divider />
      <!-- Residence detail -->
      <template>
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.DETAIL') }}</h1>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.DESCRIPTION')" prop="description" label-width="200px" required>
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 4}"
            :placeholder="$t('message.global.PLEASE_ENTER')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.global.SURFACE')" prop="surface" label-width="200px" required>
          <el-input-number v-model="form.surface" :precision="2" :min="1" :placeholder="$t('message.global.PLEASE_ENTER')"></el-input-number>
          <span>m²</span>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.PIECE_CNT')" prop="roomCnt" label-width="200px" required>
          <el-input-number v-model="form.roomCnt" :min="1" size="small"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.CHAMBRE_CNT')" prop="bedroomCnt" label-width="200px" required>
          <el-input-number v-model="form.bedroomCnt" :min="1" size="small"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.FURNITURE')" prop="hasFurniture" label-width="200px">
          <el-switch
            v-model="form.hasFurniture" :active-text="$t('message.global.YES')" :inactive-text="$t('message.global.NO')">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_RENT.EQUIPMENTS')">
          <renting-equipment ref="rentingEquipment" />
        </el-form-item>
      </template>
      <el-divider />
      <!-- Charge -->
      <template v-if="form.rentType === 'FULL'">
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.RENT_CHARGE') }}</h1>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.PURE_RENT')" prop="pureRent" label-width="220px" required>
          <el-input-number v-model="form.pureRent" :min="1" size="small"></el-input-number>
          <span>€</span>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.CHARGE')" prop="charge" label-width="220px" required>
          <el-input-number v-model="form.charge" :min="1" size="small"></el-input-number>
          <span>€</span>
        </el-form-item>
        <el-form-item prop="deposit" :label="$t('message.PAGE_QUESTINNAIRE.DEPOSIT')" label-width="220px" required>
          <span slot="label">
            {{ $t('message.PAGE_QUESTINNAIRE.DEPOSIT') }}
            <el-popover placement="top" width="120" trigger="click"
              :content="$t('message.PAGE_QUESTINNAIRE.DEPOSIT_NOTICE')"
            >
              <i slot="reference" class="el-icon-warning-outline"></i>
            </el-popover>
          </span>
          <el-input-number v-model="form.deposit" :min="1" size="small"></el-input-number>
          <span>€</span>
        </el-form-item>
        <el-divider />
      </template>
      <!-- Rooms -->
      <div v-if="form.rentType === 'SHARING'" class="rooms">
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.RENT_CHARGE') }}</h1>
        <div v-for="room, idx in form.rooms" :key="room.id" class="relative room-item">
          <h3 class="bold">{{ $t("message.PAGE_SECOND_HAND.CHAMBRE") }}{{ idx + 1 }}</h3>
          <el-form-item :label="$t('message.global.SURFACE')" :prop="`rooms.${idx}.surface`" label-width="220px" required>
            <el-input-number v-model="room.surface" :precision="2" :min="1" :placeholder="$t('message.global.PLEASE_ENTER')" size="small"></el-input-number>
            <span>m²</span>
          </el-form-item>
          <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.PURE_RENT')" :prop="`rooms.${idx}.pureRent`" label-width="220px" required>
            <el-input-number v-model="room.pureRent" :min="1" size="small"></el-input-number>
            <span>€</span>
          </el-form-item>
          <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.CHARGE')" :prop="`rooms.${idx}.charge`" label-width="220px" required>
            <el-input-number v-model="room.charge" :min="1" size="small"></el-input-number>
            <span>€</span>
          </el-form-item>
          <el-form-item :prop="`rooms.${idx}.deposit`" :label="$t('message.PAGE_QUESTINNAIRE.DEPOSIT')" label-width="220px" required>
            <span slot="label">
              {{ $t('message.PAGE_QUESTINNAIRE.DEPOSIT') }}
              <el-popover placement="top" width="120" trigger="click"
                :content="$t('message.PAGE_QUESTINNAIRE.DEPOSIT_NOTICE')"
              >
                <i slot="reference" class="el-icon-warning-outline"></i>
              </el-popover>
            </span>
            <el-input-number v-model="room.deposit" :min="1" size="small"></el-input-number>
            <span>€</span>
          </el-form-item>
          <el-button type="danger" size="mini" @click="removeRoom(room.id)" icon="el-icon-delete" circle class="absolute del-btn"></el-button>
        </div>
        <div class="btn-row">
          <el-button type="primary" size="mini" @click="addRoom" icon="el-icon-circle-plus-outline">{{ $t('message.PAGE_QUESTINNAIRE.ADD_ROOM') }}</el-button>
        </div>
        <el-divider />
      </div>
      <!-- Time -->
      <template>
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.TIME') }}</h1>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.AVAILABLE_DATE')" prop="availableDate" label-width="220px" required>
          <el-date-picker v-model="form.availableDate" type="date" :placeholder="$t('message.global.PLEASE_SELECT')" :picker-options="availableDatePickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('message.PAGE_QUESTINNAIRE.DURATION')" prop="rent_duration" required label-width="220px">
          <el-select v-model="form.rent_duration" :placeholder="$t('message.PAGE_QUESTINNAIRE.DURATION')">
            <el-option
              v-for="item in durationOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-divider />
      <template>
        <h1>{{ $t('message.PAGE_QUESTINNAIRE.PHOTO_UPLOAD') }}</h1>
        <el-alert :title="$t('message.PAGE_QUESTINNAIRE.INTERNAL_PHOTOS')" type="success" effect="dark" :closable="false"></el-alert>
        <div style="height: 16px;"></div>
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :file-list="files" :on-change="uploadChangeHandler">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}" class="relative full-w full-h">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions" :class="{ 'upload-list-item-actions': isMobile }">
              <span class="el-upload-list__item-delete" @click="removeFile(file.url)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
            <span @click="selectPhotoTag(file.uid)" class="absolute photo-tag-btn pointer">
              {{ fileTags[file.uid] ? fileTags[file.uid].label : $t('message.PAGE_QUESTINNAIRE.PHOTO_TAG_UNSELECTED') }}
            </span>
          </div>
        </el-upload>
      </template>
    </el-form>
    <div class="flex justify-center confirm-btn-row">
      <el-button @click="confirm" :loading="loading" type="primary" :disabled="processed">
        {{ processed ? $t('message.global.ALREADY_SUMITTED') : $t('message.global.CONFIRM') }}
      </el-button>
    </div>
    <client-only>
      <el-dialog :visible.sync="photoTagSelectDialog" width="300" :title="$t('message.PAGE_QUESTINNAIRE.PHOTO_TAG_DIALOG_TITLE')">
        <el-select v-model="photoTagSelectDialogVal" @change="photoTagSelectDialogChangeHandler">
          <el-option v-for="it in photoTagOptions" :key="it.value" :value="it.value" :label="it.label"></el-option>
        </el-select>
      </el-dialog>
    </client-only>
  </div>
</template>

<script lang="js">
import { createNamespacedHelpers } from 'vuex'
import rem from "~/common/rem.js";
import { addressAutocompleteSearch, upload2S3, createPath } from '../utils';
import RentingEquipment from '../components/rentingEquipment.vue';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  middleware: "responsive",
  components: { RentingEquipment },
  data () {
    return {
      processed: false,
      labelPosition: "left",
      addressInput: '',
      addressManualInput: false,
      files: [],
      loading: false,
      fileTags: {},
      photoTagSelectDialog: false,
      photoTagSelectDialogVal: '',
      form: {
        rentType: '',
        residenceType: '',
        title: '',
        city: '',
        zip_code: '',
        address: '',
        description: '',
        surface: '',
        roomCnt: 1,
        bedroomCnt: 1,
        hasFurniture: false,
        availableDate: '',
        rent_duration: '',
        pureRent: 0,
        charge: 0,
        deposit: 0,
        rooms: []
      }
    };
  },
  created () {
    if (this.isMobile) {
      this.labelPosition = 'top';
    }
    const translatedMonth = this.$t('message.global.MONTHS');
    this.durationOptions = [1, 3, 6, 12, 24].map(value => ({ value, label: value + ' ' + translatedMonth }));
    this.formRules = {
      description: [
        { min: 30, message: this.$t('message.FORM_RULE.MESSAGE_MIN_LEN').replace('{minLen}', '30'), trigger: 'blur' }
      ],
    };
    this.availableDatePickerOptions = {
      disabledDate(time) { return time.getTime() < Date.now(); },
    }
  },
  mounted () {
    if (this.isMobile) rem();
    if (process.client) setTimeout(this.checkCurrentAuth, 8* 1000);
  },
  watch: {
    'form.rentType' (rentType) {
      if (rentType === 'FULL') {
      } else if (rentType === 'SHARING') {
      }
    }
  },
  computed: {
    isDesktop () {
      return this.$device.isDesktop;
    },
    isMobile () {
      return this.$device.isMobile;
    },
    photoTagOptions () {
      const tagOptionObj = this.$t('message.PAGE_QUESTINNAIRE.PHOTO_TAG_LIST');
      const tagOptions = Object.entries(tagOptionObj).map(([value, label]) => ({ value, label }));
      const { rentType, rooms } = this.form;
      const translatedBedroom = this.$t('message.PAGE_SECOND_HAND.CHAMBRE');
      if (rentType === 'FULL') {
        tagOptions.push({ value: 'BEDROOM', label: translatedBedroom })
      } else if (rentType === 'SHARING') {
        for (const i in rooms) {
          const idx = i + 1;
          tagOptions.push({ value: 'BEDROOM' + idx, label: translatedBedroom + idx })
        }
      }
      return tagOptions;
    },
    ...mapGetters(['curAuthInfo']),
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
    enterAddress () {
      this.addressManualInput = true;
    },
    handleSelectAddr (item) {
      const { name: address, city, postcode, label, latitude, longitude } = item;
      this.addressInput = label;
      this.form.address = address;
      this.form.city = city;
      this.form.zip_code = postcode;
      this.form.latitude = latitude;
      this.form.longitude = longitude;
    },
    addressAutocompleteSearch (queryString, cb) {
      if (queryString.length < 3) return cb([]);
      addressAutocompleteSearch(queryString)
        .then(results => {
          if (Array.isArray(results))
            cb(results);
          else
            cb([]);
        })
        .catch(console.error);
    },
    addRoom () {
      const id = Math.random().toString().slice(2);
      this.form.rooms.push({ id, surface: 0, pureRent: 0, charge: 0, deposit: 0 });
      this.form = { ...this.form };
    },
    removeRoom (id) {
      const rooms = this.form.rooms.filter(it => it.id !== id);
      this.form = { ...this.form, rooms };
    },
    uploadChangeHandler (file) {
      this.files.push(file);
    },
    removeFile (url) {
      this.files = this.files.filter(it => it.url !== url);
    },
    selectPhotoTag (uid) {
      this.photoTagSelectDialog = true;
      this.photoTagSelectDialogVal = this.fileTags[uid]?.value;
      this.selected_photo_uid = uid;
    },
    photoTagSelectDialogChangeHandler () {
      const value = this.photoTagSelectDialogVal;
      const label = this.photoTagOptions.find(it => it.value === value)?.label;
      this.fileTags[this.selected_photo_uid] = { value, label };
      this.fileTags = { ...this.fileTags };
    },
    confirm () {
      const { user_id: userId } = this.curAuthInfo ?? {};
      const formRef = this.$refs.form;
      const rentingEquipmentRef = this.$refs.rentingEquipment;
      if (!rentingEquipmentRef) return;
      if (!formRef) return;
      const equipmentConfig = rentingEquipmentRef.getStatus();
      const files = this.files;
      if (files.length < 3) return;
      const lang = this._i18n.locale, id = crypto.randomUUID();
      const uploadFiles = () => {
        const _files = files.map(it => ({ contentType: it.raw.type }));
        return this.$api.article.getRentPhotosPresignedUrls({ id, files: _files })
          .then(res => res.data)
          .then(list => {
            const promises = [];
            const ret = [];
            for (const idx in list) {
              const it = list[idx], file = files[idx];
              if (it.presignedUrl && it.downloadUrl && file) {
                promises.push(upload2S3(it.presignedUrl, file.raw));
                ret.push({ tag: this.fileTags[file.uid]?.value, downloadUrl: it.downloadUrl });
              }
            }
            return Promise.all(promises).then(() => ret);
          })
      }
      const form = { ...this.form }, rooms = form.rooms;
      if (form.rentType === 'SHARING' && rooms?.length) {
        const pureRentArr = rooms.map(it => it.pureRent), chargeArr = rooms.map(it => it.charge),
          depositArr = rooms.map(it => it.deposit), surfaceArr = rooms.map(it => it.surface);
        form.pureRentRange = [Math.min(...pureRentArr), Math.max(...pureRentArr)];
        form.chargeRange = [Math.min(...chargeArr), Math.max(...chargeArr)];
        form.depositRange = [Math.min(...depositArr), Math.max(...depositArr)];
        form.surfaceRange = [Math.min(...surfaceArr), Math.max(...surfaceArr)];
      }
      formRef.validate(valid => {
        if (!valid) return;
        this.loading = true;
        uploadFiles()
          .then(images => this.$api.article.createNewRent({
            id, lang, userId, detail: { ...form, images, equipmentConfig }
          }))
          .then(() => {
            this.$notify({ title: 'Success', message: this.$t('message.global.APPLICATION_POSTED_SUCCESS'), type: 'success' });
            this.processed = true;
          })
          .catch(() => this.$notify({ title: 'Error', message: this.$t('message.global.REQUEST_RETRY'), type: 'error' }))
          .finally(() => this.loading = false);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.placed-center {
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  width: 96vw;
  max-width: 560px;
}
.questionnaire {
  h1 {
    font-weight: 700;
    margin-bottom: 24px;
    font-size: 24px;
  }
  .btn-row {
    margin: 16px 0;
    text-align: right;
  }
  .confirm-btn-row {
    margin: 16px 0 32px;
  }
  .rooms {
    .room-item {
      .del-btn {
        bottom: 4px;
        right: 0;
      }
    }
  }
  .photo-tag-btn {
    top: 110px;
    left: 50%;
    transform: translate(-50%);
    width: max-content;
    background: #fff;
    display: block;
    opacity: .9;
    padding: 0 6px;
    border-radius: 6px;
  }
  .el-upload-list__item-thumbnail {
    height: unset;
  }
  .upload-list-item-actions {
    opacity: 1;
    color: red;
    background: unset;
    .el-upload-list__item-delete {
      display: block;
    }
  }
}
.address-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

<style>
.address-autocomplete .el-autocomplete-suggestion__list li {
  line-height: initial;
  margin-bottom: 6px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
