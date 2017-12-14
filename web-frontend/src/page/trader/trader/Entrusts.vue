<template>
    <div>
        <el-row>
            <el-table
                    :data="entrusts"
                    style="width: 100%" @row-click="rowClick"
                    @row-dblclick="editEntrust" :row-class-name="rowClassName"
                    v-loading="loading"
                    :row-key="rowKey" :expand-row-keys="expandKey">
                <el-table-column type="expand">
                    <template scope="props">
                        <done :entrust="props.row"></done>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="securityId"
                        label="投资标的" min-width="150">
                    <template scope="props">
                        <span>{{selectedInstruct.securityCode}}</span>
                        <span style="margin-left: 5px">{{selectedInstruct.securityName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tradeType"
                        label="买卖类型" min-width="150">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <entrust-update-tradeType :entrust="props.row"></entrust-update-tradeType>
                        </div>
                        <div v-else>
                            <span>{{props.row.tradeServiceLabel}}</span><br>
                            <span>{{props.row.tradeTypeLabel}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="brokerageFirmId"
                        label="经纪公司" min-width="90">
                    <template scope="props">
                        <div v-if="props.row.editer">
                           <entrust-update-brokerage-firm :entrust="props.row"></entrust-update-brokerage-firm>
                        </div>
                        <div v-else>
                            <span>{{props.row.brokerageFirmId}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="成本价/成交均价" min-width="200">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <entrust-update-cost-price :entrust="props.row"></entrust-update-cost-price>
                        </div>
                        <div v-else>
                            <span class="space">{{props.row.priceTypeLabel}}</span><br>
                            <span>{{props.row.entrustPrice}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="entrustQuantity"
                        label="委托量" min-width="100">
                    <template scope="props">
                        <div v-if="props.row.editer">
                            <entrust-update-quantity :entrust="props.row"></entrust-update-quantity>
                        </div>
                        <div v-else>
                            <span>{{props.row.entrustQuantity}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop=""
                        label="对手方" min-width="100">
                    <template scope="props">
                        <div v-if="props.row.editer">

                        </div>
                        <div v-else>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="状态" min-width="70">
                    <template scope="props">
                        <div v-if="props.row.editer">

                        </div>
                        <div v-else>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="120">
                    <template scope="props">
                        <div v-if="props.row.editer == true">
                            <el-button type="info" size="small" @click="completEditInstruct(props.row)">退出编辑</el-button>
                        </div>
                        <div v-else>
                            <el-dropdown split-button　size="small" @click.stop.native="">
                                操作
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>提交</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    import EntrustUpdateTradeType from './EntrustUpdateTradeType.vue'
    import EntrustUpdateBrokerageFirm from './EntrustUpdateBrokerageFirm.vue'
    import EntrustUpdateQuantity from './EntrustUpdateQuantity.vue'
    import EntrustUpdateCostPrice from './EntrustUpdateCostPrice.vue'
    import Done from './Done.vue'
    export default{
        data(){
           return {
               loading: false,
               expandKey:[]
           }
        },
        components:{
            EntrustUpdateTradeType,
            EntrustUpdateBrokerageFirm,
            EntrustUpdateQuantity,
            EntrustUpdateCostPrice,
            Done
        },
        computed:{
            selectedInstruct: function () {
                return this.$store.state.trader.selectedInstruct;
            },
            entrusts: function () {
                return this.$store.state.trader.entrusts;
            }
        },
        watch: {
            selectedInstruct: function (item) {
                this.getEntrust();
            }
        },
        methods:{
            editEntrust: function (row, column, cell, event) {
                this.$store.dispatch('trader_setEditStatus',{item:row,editer:true})
            },
            completEditInstruct: function (row) {
                this.getEntrust();
            },
            getEntrust: function () {
                var _self = this;
                _self.loading = true;
                _self.$store.dispatch('trader_getEntrusts').then(() => {
                    _self.loading = false;
                });
            },
            rowClassName: function (row,index) {
                if (row.selected==true){
                    return 'selected';
                }
                return "";
            },
            rowClick: function (row) {
                this.$store.dispatch('trader_getDone',row);
                this.expandKey = (this.expandKey.indexOf(row.id)<0||row.editer==true)?[row.id]:[];
                this.$store.commit(types.TRADER_SET_SINGLE_SELECTED,{item:row,selected:true});
            },
            rowKey: function (row) {
                return row.id;
            }
        }
    }
</script>
<style scoped>

</style>