<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-button-group style="vertical-align:top">
                        <el-button type="pirmary" size="small" icon="arrow-left"
                                   @click="setMainStatus">返回</el-button>
                        <el-button type="pirmary" size="small" icon="plus"
                                   @click.stop.native="createBasketInstruct">创建指令</el-button>
                    </el-button-group>
                    <span>篮子名称：{{currBasketInfo.basketName}}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        computed: {
            currBasketInfo: function () {
                return this.$store.state.invest.currBasketInfo;
            }
        },
        methods:{
            setMainStatus: function () {
                this.$store.commit(types.INVEST_SET_MAIN_STATUS)
            },
            createBasketInstruct: function () {
                var _self = this;
                _self.$store.dispatch('invest_createBasketInstruct').then(() => {
                })
            }
        }
    }
</script>
<style scoped>
    .head-left{
        margin-left:20px;
    }
</style>