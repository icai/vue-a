<template>
    <div>
        <el-row>
            <div class="line_bottom">
                <h1>资金分配</h1>
            </div>
        </el-row>
        <div v-for="item in fundECAallotList._embedded">
            <el-row>
                <el-col :offset="1">
                    <h3>{{item.currency}} <strong>{{item.cash}}</strong>
                        <span style="margin-left: 50px">未分配 {{item.unassignedCapital}}</span>
                    </h3>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1">
                   <el-table :data="item['capital-details']">
                       <el-table-column sortable
                                        prop="name"
                                        label="基金产品账户">
                       </el-table-column>
                       <el-table-column sortable
                                        prop="cash"
                                        label="现金">
                       </el-table-column>
                       <el-table-column>
                           <template scope="props">
                               {{props.row.inEnabled}}
                               <el-popover
                                       placement="top"
                                       width="200"
                                       :disabled="!props.row.enabled"
                                       >
                                   <div class="alllot">
                                       <el-input v-model="occurAmount" autofocus placeholder="转入金额" style="width: 150px"></el-input>
                                       <el-button type="success" size="small"
                                        @click.native="allotOk(item,props.row,'in')">确定</el-button>
                                   </div>
                                   <el-button slot="reference" type="text" size="small" style="margin-left: 12px"
                                             @click.native="initOccurAmount(props.row)">转入</el-button>
                               </el-popover>

                               <el-popover
                                       placement="top"
                                       width="200"
                                       :disabled="!props.row.enabled">
                                   <div class="alllot">
                                       <el-input v-model="occurAmount" placeholder="转出金额" style="width: 150px"></el-input>
                                       <el-button type="success" size="small"
                                              @click.native="allotOk(item,props.row,'out')">确定</el-button>
                                   </div>
                                   <el-button slot="reference" type="text" size="small" style="margin-left: 12px"
                                              @click.native="initOccurAmount(props.row)">转出</el-button>
                               </el-popover>
                           </template>
                       </el-table-column>
                   </el-table>
                </el-col>
            </el-row>
        </div>
    </div>

</template>
<script>
    export default{
        data(){
            return {
                loading: false,
                fundECAallotList:[],
                occurAmount:0
            }
        },
        mounted: function(){
            this.getFundECAOne();
        },
        methods:{
            getFundECAOne: function(){
                var _self = this;
                _self.winsigns.ds.GET({url:_self.winsigns.api.fund.ecaURL(_self.$route.params.fundECAId),
                    data:{}},function(data){
                    _self.loading = false;
                    _self.fundECAallotList = data;//data._embedded?data._embedded["eca-cash-pools"]:[];
                    _self.fundECAallotList._embedded = data._embedded?data._embedded["eca-cash-pools"]:[];
                })
            },
            initOccurAmount: function (item) {
                this.$set(item,'enabled', true)
                this.occurAmount = 0;
            },
            allotOk: function (item, itemson, type) {
                var _self = this;
                if (!itemson.id){
                    _self.winsigns.ds.POST({url:_self.winsigns.api.fund.ecaCapitalDetailURL(""),
                    data:{'ecaCashPoolId':item.id,
                        'fundAccountId':itemson.fundAccountId,
                        'accountType':_self.fundECAallotList.accountType,
                        'currency':item.currency}},function (data) {
                        _self.winsigns.ds.GET({url:_self.winsigns.api.fund.ecaCapitalDetailURL(data.id)},function(newData){
                            _self.allotInOut(item.id,newData.id, _self.occurAmount, type);
                        })
                    })
                } else{
                    _self.allotInOut(item.id,itemson.id, _self.occurAmount, type);
                }
            },
            allotInOut: function (eaPoolId,faPoolId, cash,type) {
                var _self = this;
                var url = type=='in'?_self.winsigns.api.fund.allotEcaToFa(eaPoolId):
                    _self.winsigns.api.fund.allotFaToEca(faPoolId);
                _self.winsigns.ds.POST({url:url,
                    data:{
                        'faCapitalPoolId': faPoolId,
                        'ecaCashPoolId':eaPoolId,
                        'occurAmount': cash
                    },
                    v:_self}, function (data) {
                    _self.getFundECAOne();
                    _self.occurAmount = 0;
                });
            }
        }
    }
</script>
<style scoped>   
    .right_button{
        padding-top:30px;
    }
    .alllot{
        white-space: nowrap;
    }
</style>