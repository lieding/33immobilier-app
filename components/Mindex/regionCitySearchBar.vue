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
      if (!this.search) return this.info.slice(0, 30);
      const lowered = this.search.toLowerCase();
      return this.info.filter(it => it.searchKey.includes(lowered)).slice(0, 30);
    }
  },
  methods: {
    loadData () {
      const loader = this.dataLoader;
      if (typeof loader === 'function')
        loader().then?.(rows => {
          const info = [];
          for (const { region_id, region_name, cities, longitude, latitude } of rows) {
            const title = `${region_name}(${region_id})`
            info.push({ region_id, region_name, title, searchKey: title.toLowerCase(), isRegion: true, longitude, latitude });
            for (const city of cities) {
              const title = `${city}(${region_id})`;
              info.push({ region_id, city, title, searchKey: `${city} ${region_id}`.toLowerCase()  });
            }
          }
          this.info = info;
          this.loading = false;
        })
    },
    select (item) {
      if (item.isRegion) {
        const { region_id: id, region_name: name, latitude, longitude } = item;
        this.$emit('select', { locationType: LocationType.L2_AREA, id, name, latitude, longitude });
      } else {
        this.$emit('select', { locationType: LocationType.LOCALITY, regionId: item.region_id, name: item.city });
      }
    }
  }
}
</script>
