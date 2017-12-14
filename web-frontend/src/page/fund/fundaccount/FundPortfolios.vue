<template>
    <div>
        <el-row>
            <div class="line_bottom">
                <el-button type="text" class="float_right right_button"
                @click="addPortf()">添加投资组合</el-button>
                <h1>投资组合</h1>
            </div>
            <div class="line_margin_top"></div>
        </el-row>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-table v-loading="loading" :data="fundPortfoliosList" style="width: 100%"
                stripe @row-dblclick="setModifyStatus">
                    <el-table-column sortable
                        prop="name"
                        label="组合名称">
                        <template scope="props">
                            <div v-if="(props.row.status=='add') || (props.row.status=='edit')">
                                <el-input v-model="props.row.name"></el-input>
                            </div>
                            <div v-else>
                                <span>{{props.row.name}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label=" $t('message.global.operation') ">
                        <template scope="props">
                            <el-button v-if="isModify(props.row)"
                                size="small"
                                @click="postPortf(props.row)"
                            >{{ $t("message.global.save") }}</el-button>
                            <el-button v-if="!isModify(props.row)"
                                size="small"
                                type="danger"
                                @click="deletePortf(props.row)"
                            >{{ $t("message.global.delete") }}</el-button>
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
                fundPortfoliosList: [],
                loading: true
            }
        },
        mounted: function(){
            this.getFundPortfolios();
        },
        methods:{
            isModify: function (item) {
                return  item.status=='add' || item.status=='edit';
            },
            setModifyStatus: function (row) {
                this.$set(row,'status','edit');
            },
            addPortf: function(){
                this.fundPortfoliosList.splice(0,0,{
                    'status':'add'
                });
            },
            getFundPortfolios: function(){
                var _self = this;
                _self.winsigns.ds.GET({url:_self.winsigns.api.fund.fundPortfFromFundacc(_self.$route.params.fundAccId,""),
                        data:{}},function(data){
                    _self.loading = false;
                    _self.fundPortfoliosList = data._embedded?data._embedded["portfolios"]:[];
                })
            },
            postPortf: function (item) {
                var _self = this;
                if (item.status=='add'){//新增
                    _self.winsigns.ds.POST({url:_self.winsigns.api.fund.fundPortfFromFundacc(_self.$route.params.fundAccId,""),
                        data:{"name":item.name}},function(data){
                        _self.getFundPortfolios();
                        _self.$message({
                            message: _self.$t('message.global.success'),
                            type: 'success'
                        });
                    },function(err){
                        console.log(err)
                    })
                } else if (item.status=='edit'){
                    _self.winsigns.ds.PUT({url:_self.winsigns.api.fund.fundPortf(item.id),
                        data:{"name":item.name}},function(data){
                        _self.getFundPortfolios();
                        _self.$message({
                            message: _self.$t('message.global.success'),
                            type: 'success'
                        });
                    },function(err){

                    })
                }
            },
            deletePortf(item) {
                var _self = this;
                _self.$confirm(_self.$t('message.fund.eca_delete_confim'), _self.$t('message.global.prompt'), {
                    confirmButtonText: _self.$t('message.global.confirm'),
                    cancelButtonText: _self.$t('message.global.cancel'),
                    type: 'warning'
                }).then(() => {
                    _self.winsigns.ds.DELETE({url:_self.winsigns.api.fund.fundPortf(item.id),
                        data:{}},function(data){
                        _self.getFundPortfolios();
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