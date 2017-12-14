<template> 
    <div>
        <el-row>        
            <div class="line_bottom">
                <el-button type="text" class="float_right right_button"
                @click="addFundAcc()">{{ $t("message.fund.account_add") }}</el-button>
                <h1>{{ $t("message.fund.account") }}</h1>
            </div>                
            <div class="line_margin_top"></div>            
        </el-row>
        <el-row>        
            <el-col :span="18" :offset="3">                 
                <el-table v-loading="loading" :data="fundAccontList" style="width: 100%" stripe
                          @row-dblclick="setModifyStatus">
                    <el-table-column sortable
                        prop="name"
                        :label=" $t('message.fund.account_name') ">
                        <template scope="props">
                            <div v-if="props.row.status=='add'">
                                <el-input v-model="props.row.name"
                                          @blur="addFundAccount(props.row)"></el-input>
                            </div>
                            <div v-else-if="props.row.status=='edit'">
                                <el-input v-model="props.row.name"
                                @blur="updateFundAccount(props.row)"></el-input>
                            </div>
                            <div v-else>
                                <span>{{props.row.name}}</span>
                            </div>
                        </template>
                    </el-table-column>   
                    <el-table-column :label=" $t('message.global.operation') ">
                        <template scope="props">
                            <el-button v-if="!isModify(props.row)"
                                       size="small"
                                       type="text"
                                       @click="goFundAccountProperties(props.row)"
                            >{{ $t("message.global.details") }}</el-button>
                            <el-button v-if="!isModify(props.row)"
                            size="small"
                            type="danger"
                            @click="handleDelete(props.$index, props.row)">{{ $t("message.global.delete") }}</el-button>
                        </template>
                    </el-table-column>                 
                </el-table>
            </el-col>	                     
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                fundAccontList: [],
                loading: true
            }
        },
        mounted: function(){  
            this.getFundAccounts();                                           
        },
        methods:{
            isModify: function (item) {
                return  item.status=='add' || item.status=='edit';
            },
            setModifyStatus: function (row) {
                this.$set(row,'status','edit');
            },
            goFundAccountProperties: function(row){
                this.$router.push({ name: 'fund-account-properties', params: {
                    fundAccId: row.id}});
            },
            addFundAcc: function () {
                this.fundAccontList.splice(0,0,{
                    'status':'add'
                });
            },
            getFundAccounts: function(){
                var _self = this;
                _self.winsigns.ds.GET({url:_self.winsigns.api.fund.fundAccountFromFundURL(_self.$route.params.fundId,""),
                        data:{}},function(data){
                    _self.loading = false;
                    _self.fundAccontList = data._embedded?data._embedded["fund-accounts"]:[];                                                                    
                })  
            },
            addFundAccount: function(item){
                var _self = this;
                _self.winsigns.ds.POST({url:_self.winsigns.api.fund.fundAccountFromFundURL(_self.$route.params.fundId,""),
                    data:{"name":item.name,"investManagerId":123456}},function(data){
                    _self.getFundAccounts();
                    _self.$message({
                        message: _self.$t('message.global.success'),
                        type: 'success'
                    });
                },function(err){

                })
            },
            updateFundAccount: function(item){
                var _self = this;
                _self.winsigns.ds.PUT({url:_self.winsigns.api.fund.fundAccountURL(item.id),
                    data:{"name":item.name,"investManagerId":123456}},function(data){
                    _self.getFundAccounts();
                    _self.$message({
                        message: _self.$t('message.global.success'),
                        type: 'success'
                    });
                },function(err){

                })
            },
            handleDelete(index, row) {
                var _self = this;
                _self.$confirm(_self.$t('message.fund.account_delete_confim'),
                    _self.$t('message.global.prompt'), {
                        confirmButtonText: _self.$t('message.global.confirm'),
                        cancelButtonText: _self.$t('message.global.cancel'),
                        type: 'warning'
                    }).then(() => {
                    _self.winsigns.ds.DELETE({url:_self.winsigns.api.fund.fundAccountURL(row.id),
                        data:{}},function(data){
                            _self.getFundAccounts();                 
                            _self.$message({
                                message: _self.$t('message.global.success'),
                                type: 'success'
                            });                                             
                        },function(err){
                            
                        })                   
                    }).catch(() => {
                     _self.$message({
                            type: 'info',
                            message: _self.$t('message.global.cancel_delete')
                        });          
                    });                
            }
        }
    }
</script>
<style scoped>   
    .right_button{
        padding-top:30px;
    }
</style>