<template>
    <div>
        <template>
            <el-table :data="instructData" v-loading="loading" element-loading-text="拼命加载中"
                      :row-style="rowStyle" :row-class-name="rowClassName"
                      @row-dblclick="editInstruct" @row-click="rowClick"
                      :row-key="rowKey" :expand-row-keys="expandKey"
                      @cell-mouse-enter="mouseEnter"
                      @cell-mouse-leave="mouseLeave">
                <el-table-column width="40px">
                    <template scope="props">
                        <div v-if="props.row.basket == true">
                            <i class="el-icon-edit"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template scope="props">
                        <invest-body-instruct-info :instruct="props"></invest-body-instruct-info>
                    </template>
                </el-table-column>
                <el-table-column label="基金产品与组合" prop="portfolioName" sortable>
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-fund-tree :instruct="props.row"></invest-update-fund-tree>
                        </div>
                        <div v-else>
                            <invest-panel-fund-tree :instruct="props.row"></invest-panel-fund-tree>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="投资标的" sortable prop="securityName"
                                 scope="props">
                    <template scope="props" style="background-color: red">
                        <div v-if="props.row.editer">
                            <invest-update-security :instruct="props.row"></invest-update-security>
                        </div>
                        <div v-else style="height: 100%">
                            <invest-panel-security :instruct="props.row"></invest-panel-security>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="买卖类型" sortable prop="investTypeLabel">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-trader :instruct="props.row"></invest-update-trader>
                        </div>
                        <div v-else>
                            <invest-panel-trader :instruct="props.row"></invest-panel-trader>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="成本价/成交均价" sortable prop="costPrice">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-cost-price :instruct="props.row"></invest-update-cost-price>
                        </div>
                        <div v-else>
                            <invest-panel-cost-price :instruct="props.row"></invest-panel-cost-price>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="数量/总金额" sortable prop="quantity">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <invest-update-qty :instruct="props.row"></invest-update-qty>
                        </div>
                        <div v-else>
                            <invest-panel-qty :instruct="props.row"></invest-panel-qty>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template scope="props">
                        <invest-panel-status :instruct="props.row"></invest-panel-status>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template scope="props">
                        <div v-if="props.row.editer == true">
                            <el-button type="info" @click="completEditInstruct(props.row)">退出编辑</el-button>
                        </div>
                        <div v-else>
                            <el-dropdown split-button　@click.stop.native="">
                                操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.stop.native="commitInstruct(props.row)">提交指令</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100px">
                    <template scope="props">
                        <div v-if="props.row.basket == true">
                            <span class="el-icon-arrow-right" style="cursor:pointer"
                                  @click="setMainStatus(props.row)"></span>
                        </div>
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
    import InvestPanelFundTree from './InvestPanelFundTree.vue'
    import InvestPanelSecurity from './InvestPanelSecurity.vue'
    import InvestPanelTrader from './InvestPanelTrader.vue'
    import InvestPanelCostPrice　from './InvestPanelCostPrice.vue'
    import InvestPanelQty from './InvestPanelQty.vue'
    import InvestPanelStatus from './InvestPanelStatus.vue'

    import * as types from "../../../store/types"
    export default{
        components:{
            InvestBodyInstructInfo,
            InvestUpdateFundTree,
            InvestUpdateSecurity,
            InvestUpdateTrader,
            InvestUpdateCostPrice,
            InvestUpdateQty,
            InvestPanelFundTree,
            InvestPanelSecurity,
            InvestPanelTrader,
            InvestPanelCostPrice,
            InvestPanelQty,
            InvestPanelStatus
        },
        data(){
            return {
                /*instructData: null,*/
                loading: false,
                expandKey:[]
            }
        },
        mounted: function () {
            this.getAllInstruct();
        },
        computed: {
            instructData: function () {
                var filterKey = this.$store.state.invest.searchData
                var data = this.$store.state.invest.instructData;
                if (filterKey){
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                return data;
            }
        },
        methods: {
            getAllInstruct: function () {
                var _self = this;
                _self.loading = true;
                _self.$store.dispatch('invest_getInstructData').then(() => {
                    //_self.instructData = _self.$store.state.invest.instructData;
                    _self.loading = false;
                });
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
            rowStyle: function (row, index) {
                return {
                    height: '100px'
                }
            },
            rowClick: function (row) {
                this.expandKey = (this.expandKey.indexOf(row.id)<0||row.editer==true)?[row.id]:[];
                this.$store.dispatch('invest_setSelectStatus',{item:row,selected:!row.selected});
            },
            completEditInstruct: function (row) {
                this.getAllInstruct();
                /*this.$store.dispatch('invest_setEditStatus',{item:row,editer:false})*/
            },
            rowClassName: function (row,index) {
                if (row.selected==true){
                    return 'selected';
                }
                return "";
            },
            mouseEnter: function (row, column, cell, event) {
                //this.$store.commit(types.INVEST_SET_OPBUTTONSTATUS,{item:{item:row,showOpbutton:true}});
            },
            mouseLeave: function (row, column, cell, event) {
                //this.$store.commit(types.INVEST_SET_OPBUTTONSTATUS,{item:{item:row,showOpbutton:false}});
            },
            commitInstruct: function (item) {
                this.$store.dispatch('invest_commitInstruct',{item:item});
            },
            setMainStatus: function (item) {
                this.$store.commit(types.INVEST_SET_BAKSET_INFO , {item:item});
                this.$store.commit(types.INVEST_SET_MAIN_STATUS);
            }
        }
    }
</script>
<style scoped>

</style>