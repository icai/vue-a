<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="head-left">
                    <el-button-group>
                        <el-dropdown split-button size="small" @click="createInstruct">
                            <i class="el-icon-plus">创建指令</i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.stop.native="createInstruct">创建指令</el-dropdown-item>
                                <el-dropdown-item @click.stop.native="createBasket">创建篮子</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--<el-dropdown split-button size="small"　@click.stop.native="">
                            <i class="el-icon-share">提交</i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>提交</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->
                    </el-button-group>
                    <el-button-group style="vertical-align:top">
                        <el-button type="pirmary" size="small" icon="delete" @click="deleteInstruct"></el-button>
                    </el-button-group>
                    <div class="search">
                        <el-input
                            v-model="search"
                            size="small"
                            placeholder="请输入关键词搜索"
                            icon="search">
                        </el-input>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        computed:{
            search:{
                get () {
                    return this.$store.state.invest.searchData;
                },
                set(value){
                    this.$store.commit(types.INVEST_SET_SEARCHDATA,value);
                }
            }
        },
        methods:{
            setMainStatus: function () {
                this.$store.commit(types.INVEST_SET_MAIN_STATUS)
            },
            createInstruct: function () {
                var _self = this;
                _self.$store.dispatch('invest_createInstruct').then(() => {
                })
            },
            createBasket: function () {
                var _self = this;
                _self.$store.dispatch('invest_createBasket').then(() => {
                })
            },
            deleteInstruct: function () {
                var _self = this;
                _self.$confirm(_self.$t('message.fund.delete_confim'),
                    _self.$t('message.global.prompt'), {
                        confirmButtonText: _self.$t('message.global.confirm'),
                        cancelButtonText: _self.$t('message.global.cancel'),
                        type: 'warning'
                    }).then(() => {
                    _self.$store.dispatch('invest_deleteInstruct').then(() => {
                        _self.$store.dispatch('invest_getInstructData').then(() => {
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: _self.$t('message.global.cancel_delete')
                    });
                });
            }
        }
    }
</script>
<style scoped>
    .head-left{
        margin-left:20px;
    }
</style>