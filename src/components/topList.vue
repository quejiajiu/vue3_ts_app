<template>
    <div class="topList">
        <div class="ub ub-ver item" v-for="(val,key) in list" :key="key">
            <div class="ub ub-pc img"  @click="linkFn(val)">
                <van-image :src="val.icon" radius="10">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </div>
            <div class="name">{{val.name}}</div>
            <div class="ub ub-pc type">{{val.type}}</div>
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
.topList {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    overflow-x: scroll;
    white-space: nowrap;


    .item {
        display: inline-block;
        width: 140px;
        margin-right: 30px;
        margin-bottom: 16px;

        /deep/.van-image {
            width: 140px;
            height: 140px;
        }

        .name {
            text-align: center;
            font-size: 20px;
            color: #222;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 10px;
        }

        .type {
            font-size: 16px;
            color: #999;
            overflow: visible;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
  