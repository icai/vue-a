<template>
    <div>
        <el-row>
            <el-input
                    placeholder="请输入关键词搜索"
                    icon="search">
            </el-input>
            <div v-for="item in instructs">
                <div v-if="item.basket!=true" class="instruct_single">
                    <el-card :class="{ selected: item.selected }"
                             v-loading="loading"
                             @click.native="selectedInstruct(item)">
                        <div class="instruct">
                            <div class="fund">
                                <span>{{item.fundName}}</span>
                                <span>/{{item.fundAccName}}</span>
                                <span>/{{item.portfolioName}}</span>
                            </div>
                            <el-tag type="primary" class="costprice">{{item.costPrice}}元</el-tag><br>
                            <el-tag type="primary" class="costprice">{{item.securityCode}}-{{item.securityName}}</el-tag><br>
                            <el-tag type="primary" class="costprice">{{item.quantity}}股</el-tag><br>
                            <el-progress :percentage="70"></el-progress>
                        </div>
                    </el-card >
                </div>
                <div v-else class="instruct_bottom">
                    <el-card  v-loading="loading" >
                            <div>
                                <span class="basket-name">{{item.basketName}}</span>
                                <span :class="[item.expand?'el-icon-arrow-down':'el-icon-arrow-up','expand']"
                                      @click="expand(item)"></span>
                            </div>
                        </el-card >
                    <el-card v-for="detail in item.detail"  v-if="item.expand"
                             :class="{ selected: detail.selected }"
                                 v-loading="loading"
                                 @click.native="selectedInstruct(detail)">
                            <div class="instruct">
                                <div class="fund">
                                    <span>{{detail.fundName}}</span>
                                    <span>/{{detail.fundAccName}}</span>
                                    <span>/{{detail.portfolioName}}</span>
                                </div>
                                <el-tag type="primary" class="costprice">{{detail.costPrice}}元</el-tag><br>
                                <el-tag type="primary" class="costprice">{{detail.securityCode}}-{{detail.securityName}}</el-tag><br>
                                <el-tag type="primary" class="costprice">{{detail.quantity}}股</el-tag><br>
                                <el-progress :percentage="70"></el-progress>
                            </div>
                        </el-card >

                </div>
            </div>

        </el-row>
    </div>
</template>
<script>
    import util from '../../../common/util'
    import * as types from "../../../store/types"
    export default{
        data(){
            return{
                loading : false
            }
        },
        components:{

        },
        computed: {
            instructs: function () {
                return this.$store.state.trader.instructs;
            }
        },
        mounted: function(){
            this.getAllInstruct();
        },
        methods:{
            getAllInstruct: function () {
                var _self = this;
                _self.loading = true;
                _self.$store.dispatch('trader_getInstructs').then(() => {
                    if (_self.instructs.length>0){
                        this.$store.commit(types.TRADER_SET_SELECTEDSTATUS,{item:_self.instructs[0],selected:true});
                        this.$store.commit(types.TRADER_SET_SELECTEDINSTRUCT,{item:_self.instructs[0]});
                    }
                    _self.loading = false;
                });
            },
            selectedInstruct: function (item) {
                this.$store.commit(types.TRADER_SET_SELECTEDSTATUS,{item:item,selected:true});
                this.$store.commit(types.TRADER_SET_SELECTEDINSTRUCT,{item:item});
            },
            expand: function (item) {
                this.$store.dispatch('trader_getBasketInstructData',item);
                this.$store.commit(types.TRADER_SET_BASKETEXPAND,{item:item});
            }
        }
    }
</script>
<style scoped>
    .instruct_single{
        height: 150px;
    }
    .instruct_bottom,.instruct_single{
        margin-bottom: 20px;
    }
    .selected{
        background-color:#EFF2F7;
    }
    .fund{
        margin-top: -20px;
    }
    .costprice{
        margin-top: 8px;
    }
    .costprice,.fund,.basket-name{
        margin-left: -15px;
    }
    .expand{
        float: right;
        margin-top: 100px;
    }

</style>