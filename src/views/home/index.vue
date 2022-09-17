<template>
  <div class="ub ub-ver home">
    <div class="search">
      <van-search class="input" v-model="searchValue" placeholder="Search..." shape="round" />
    </div>
    <div class="topListBox">
      <span>Recommend</span>

      <topList :list="topAppList" />
    </div>
    <div class="ub-f1 appListBox">
      <appList :list="mainList" />

    </div>
  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance, watch } from 'vue';
import topList from '@/components/topList.vue';
import appList from '@/components/list.vue';
import { Debounced } from '@/utils/common'
import { Toast } from 'vant';

export default {
  name: "home",
  components: {
    topList, appList
  },
  props: [],
  setup(props) {
    const searchValue = ref('');
    const topAppList = ref([]);
    const mainList = ref([]);
    let appMainList = [];

    let debouncedUse: Function = new Debounced().use(searchFn, 400)
    function searchFn(val: string) {
      if (val == '') {
        mainList.value = appMainList;
      } else {
        mainList.value = appMainList.filter((v: any) => {
          const _str: string = v.title + v.name + v.rights + v.summary;
          return _str.indexOf(val) !== -1
        })
      }
    }
    watch(searchValue, (val) => {
      debouncedUse(val)
    })

    const ctx: any = getCurrentInstance();
    const { $api } = ctx.appContext.config.globalProperties;
    function getDateMap(data: Array<any>): Array<any> {
      console.log((data[0]))
      return data.map((val: any) => {
        let img: string = val['im:image'][0]?.label
        return {
          title: val.title?.label,
          rights: val.rights?.label,
          name: val['im:name']?.label,
          summary: val.summary?.label,
          type: val.category?.attributes?.label,
          icon: img,
          comments: val.id?.attributes['im:id'],
          link:val.link[0]?.attributes?.href
        }
      });
    }
    async function getAppListSearch() {
      var res = await $api.getData('6017');
      return true;
    }
    // 获取顶部app列表
    async function getTopListData() {
      var res = await $api.topgrossingapplications(10);
      if (res) {
        let data: Array<any> = res.feed?.entry
        let list: Array<any> = getDateMap(data)
        topAppList.value = JSON.parse(JSON.stringify(list))
        localStorage.setItem('topAppList', JSON.stringify(list));
      } else {
        let _str = localStorage.getItem('topAppList')
        if (_str) {
          try {
            topAppList.value = JSON.parse(_str);
          } catch (e) { }
        }
      }
      return true;
    }
    // 获取主体app列表
    async function getAppList() {
      var res = await $api.topfreeapplications(100);
      if (res) {
        let data: Array<any> = res.feed?.entry
        let list: Array<any> = getDateMap(data)
        appMainList = JSON.parse(JSON.stringify(list))
        mainList.value = appMainList;
        localStorage.setItem('appMainList', JSON.stringify(list));
      } else {
        let _str = localStorage.getItem('appMainList')
        if (_str) {
          try {
            appMainList = JSON.parse(_str);
            mainList.value = JSON.parse(_str);
          } catch (e) { }
        }
      }
      return true;
    }
    init()
    function init() {
      Toast.loading({
        message: '加载中...',
        forbidClick: false,
        duration: 10000,
        loadingType: 'spinner',
      });
      Promise.all([
        getTopListData(),
        getAppList(),
        getAppListSearch()
      ]).then(() => {
        Toast.clear()
      })

    }
    return { searchValue, topAppList, mainList };
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;

  .search {
    padding: 0 12px;
    margin-top: 12px;

    /deep/.van-search__field {
      height: 60px;
    }
  }

  .topListBox {
    min-height: 160px;
    padding: 12px 10px 0px 20px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .appListBox {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
