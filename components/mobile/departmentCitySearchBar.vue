<template>
  <div>
    <van-search v-model="search" :placeholder="$t('message.global.INDEX_SEARCH_PLACEHOLDER')" />
    <van-list
      v-model="loading"
      :finished="true"
      finished-text="The end"
    >
      <van-cell v-for="item in filtered" :key="item.title" :title="item.title" @click.stop="select(item)" />
    </van-list>
  </div>
</template>

<script>
import { LocationType } from '../../common/config';
import { searchDepartmentCityPostcode } from '../../utils/search';

export default {
  props: {
    dataLoader: {
      type: Function,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      info: null,
      search: '',
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (vis) {
        if (vis && !this.info)
          this.loadData();
      }
    }
  },
  computed: {
    filtered () {
      if (!this.info) return [];
      if (!this.search || this.search.length < 2) return this.info.slice(0, 30);
      return searchDepartmentCityPostcode(this.search, this.info);
    }
  },
  methods: {
    loadData () {
      const loader = this.dataLoader;
      if (typeof loader === 'function')
        loader().then?.(info => {
          this.info = info;
          this.loading = false;
        })
    },
    select (item) {
      const { isDepartment, isPostalCode, department_id, department_name, latitude, longitude, postal_code, name } = item;
      let obj;
      if (isDepartment) {
        obj = { locationType: LocationType.L2_AREA, id: department_id, name: department_name, latitude, longitude }
      } else if (isPostalCode) {
        obj = { locationType: LocationType.POSTAL_CODE, departmentId: department_id, postal_code, latitude, longitude };
      } else {
        obj = { locationType: LocationType.LOCALITY, departmentId: department_id, name: name };
      }
      this.$emit('select', obj);
    }
  }
}
</script>
