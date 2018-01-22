<template>
    <div>
        <template>
            <el-table :data="instructData" v-loading="loading" element-loading-text="拼命加载中"
                      :row-style="rowStyle" :row-class-name="rowClassName"
                      @row-dblclick="editInstruct" @row-click="rowClick"
                      :row-key="rowKey" :expand-row-keys="expandKey">
                <el-table-column type="expand">
                    <template scope="props">
                        <invest-body-instruct-info :instruct="props"></invest-body-instruct-info>
                    </template>
                </el-table-column>
                <el-table-column label="基金产品与组合" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-fund-tree :instruct="props.row"></invest-update-fund-tree>
                        </div>
                        <div v-else>
                            <span class="invest_auxiliary">{{props.row.fundName}}/{{props.row.fundAccName}}</span><br>
                            <span class="invest_main_info">{{props.row.portfolioName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="投资标的" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <!--<el-input v-model="security" @blur="updateInstruct(props.row)"></el-input>-->
                            <invest-update-security :instruct="props.row"></invest-update-security>
                        </div>
                        <div v-else>
                            <span class="invest_auxiliary">{{props.row.market}}</span>
                            <div class="invest_main_info"><span>{{props.row.securityCode}}</span><span>{{props.row.securityName}}</span></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="买卖类型" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-trader :instruct="props.row"></invest-update-trader>
                        </div>
                        <div v-else>
                            <span class="invest_auxiliary">{{props.row.investServiceLabel}}</span>
                            <div class="invest_main_info"><span>{{props.row.investTypeLabel}}</span></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="成本价/成交均价" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-cost-price :instruct="props.row"></invest-update-cost-price>
                        </div>
                        <div v-else>
                            <div class="invest_main_info_top">
                                <span class="invest_main_info" >{{props.row.currency}}</span><span>{{props.row.costPrice}}</span>
                                <div class="invest_auxiliary">
                                    <span>{{props.row.currency}}</span><span>{{props.row.avg}}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="数量/总金额" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-qty :instruct="props.row"></invest-update-qty>
                        </div>
                        <div v-else>
                            <span class="invest_auxiliary">{{props.row.quantity}}</span><span>股</span>
                            <div class="invest_main_info">
                                <span >{{props.row.amount}}</span><span>万</span>
                            </div>
                            <div>
                                <el-progress :percentage="100" status="success"></el-progress>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template scope="props">
                        <div v-if="props.row.editer">
                        </div>
                        <div v-else-if="props.row.executionStatus=='COMMITING'">
                            <img src="../../../assets/images/trader1.jpg">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template scope="props">
                        <div v-if="props.row.editer == true">
                            <el-button type="info" @click="completEditInstruct(props.row)">退出编辑</el-button>
                        </div>
                        <!--<div v-else-if="props.row.showOpbutton == false">
                            <el-dropdown split-button　@click.stop.native="">
                                操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.stop.native="commitInstruct(props.row)">提交指令</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>-->
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import InvestBodyInstructInfo from './InvestBodyInstructInfo.vue'
    import InvestUpdateFundTree from './InvestUpdateFundTree.vue'
    import InvestUpdateSecurity from './InvestUpdateSecurity.vue'
    import InvestUpdateTrader from './InvestUpdateTrader.vue'
    import InvestUpdateCostPrice　from './InvestUpdateCostPrice.vue'
    import InvestUpdateQty from './InvestUpdateQty.vue'
    import * as types from "../../../store/types"
    export default{
        components:{
            InvestBodyInstructInfo,
            InvestUpdateFundTree,
            InvestUpdateSecurity,
            InvestUpdateTrader,
            InvestUpdateCostPrice,
            InvestUpdateQty
        },
        data(){
            return {
                /*instructData: null,*/
                loading: false,
                expandKey:[]
            }
        },
        mounted: function () {
            this.getBasketInstruct();
        },
        computed: {
            instructData: function () {
                return this.$store.state.invest.instructData;
            }
        },
        methods: {
            getBasketInstruct: function () {
                var _self = this;
                _self.loading = true;
                _self.$store.dispatch('invest_getBasketInstructData').then(() => {
                    _self.loading = false;
                });
            },
            rowStyle: function (row, index) {
                return {
                    height: '100px'
                }
            },
            rowKey: function (row) {
                return row.id;
            },
            updateInstruct: function(item){
                this.$store.dispatch('invest_updateInstruct',{item:item})
            },
            editInstruct: function (row, column, cell, event) {
                this.expandKey = [row.id];
                this.$store.dispatch('invest_setEditStatus',{item:row,editer:true})
            },
            rowClick: function (row) {
                this.expandKey = (this.expandKey.indexOf(row.id)<0||row.editer==true)?[row.id]:[];
                this.$store.dispatch('invest_setSelectStatus',{item:row,selected:!row.selected});
            },
            completEditInstruct: function (row) {
                this.getBasketInstruct();
            },
            rowClassName: function (row,index) {
                if (row.selected==true){
                    return 'selected';
                }
                return "";
            }
        }
    }
</script>
<style scoped>

</style>