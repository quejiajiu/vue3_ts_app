<template>
    <div class="appList">
        <div class="ub  item" v-for="(val,key) in list" :key="key">
            <div class="ub  ub-ac num">{{key+1}}</div>
            <div class="ub ub-pc img " @click="linkFn(val)">
                <van-image :src="val.icon" :radius="key%2 === 1 ? 60 : 0">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="ub ub-ver ub-f1 text">
                <div class="ub  name">{{val.name}}</div>
                <div class="ub  type">{{val.type}}</div>
                <div class="ub rate">
                    <!-- 没有找到评分的字段，😔😔😔😔😔😔 -->
                    <van-rate v-model="val.name.length" :size="12" color="#ffd21e" void-icon="star" void-color="#eee"
                        readonly />
                    <span>({{val.comments}})</span>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script lang="ts">
import { ref } from 'vue';
export default {
    props: {
        list: {
            type: Array,
            default: (): any => []
        },
    },
    setup() {
        function linkFn(val) {
            if (val.link) {
                window.location.href = val.link
            }
        }
        return {
            linkFn
        }
    }
};
</script>
<style lang="less" scoped>
.appList {
    // padding: 10px 20px;
    box-sizing: border-box;

    .item {
        border-bottom: 1px solid #eee;
        margin-left: 20px;
        padding: 10px;

        .num {
            width: 46px;
        }

        /deep/.van-image {
            width: 100px;
            height: 100px;
            overflow: hidden;
        }

        .text {
            margin-left: 20px;
        }

        .name {
            font-size: 20px;
            color: #222;
            overflow: visible;
            text-overflow: ellipsis;
            white-space: nowrap;

        }

        .type {
            margin-top: 6px;
            font-size: 12px;
            color: #999;
            overflow: visible;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .rate {
            margin-top: 6px;

            span {
                font-size: 12px;
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>
  