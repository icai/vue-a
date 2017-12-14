<template>
    <div>
        <el-row>
            <div class="line_bottom">
                <el-button type="text" class="float_right right_button"
                @click="addECA()">{{ $t("message.fund.eca_add") }}</el-button>
                <h1>{{ $t("message.fund.eca") }}</h1>
            </div>
            <div class="line_margin_top"></div>
        </el-row>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-table v-loading="loading" :data="fundCreaAccontList" style="width: 100%"
                stripe @row-dblclick="setModifyStatus">
                    <el-table-column sortable
                        prop="ecaTypeShowName"
                        :label=" $t('message.fund.eca_type') ">
                        <template scope="props">
                            <div v-if="(props.row.status=='add') || (props.row.status=='edit')">
                                <el-select v-model="props.row.accountType" :placeholder=" $t('message.global.select_tip') ">
                                    <el-option
                                            v-for="item in captialTypeList"
                                            :label="item.displayname"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <span>{{props.row.ecaTypeShowName}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column sortable
                        prop="accountNo"
                        :label=" $t('message.fund.eca_no') ">
                        <template scope="props">
                            <div v-if="(props.row.status=='add') || (props.row.status=='edit')">
                                <el-input v-model="props.row.accountNo"></el-input>
                            </div>
                            <div v-else>
                                <span>{{props.row.accountNo}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column sortable
                        prop="externalOpenOrganization"
                        :label=" $t('message.fund.eca_finder') ">
                        <template scope="props">
                            <div v-if="(props.row.status=='add') || (props.row.status=='edit')">
                                <el-input v-model="props.row.externalOpenOrganization"></el-input>
                            </div>
                            <div v-else>
                                <span>{{props.row.externalOpenOrganization}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label=" $t('message.global.operation') ">
                        <template scope="props">
                            <el-button v-if="!isModify(props.row)"
                                    size="small"
                                    type="text"
                                    @click="goFundCreaAccountProperties(props.row)"
                            >{{ $t("message.global.details") }}</el-button>
                            <el-button v-if="isModify(props.row)"
                                size="small"
                                @click="postFundECA(props.row)"
                            >{{ $t("message.global.save") }}</el-button>
                            <el-button v-if="!isModify(props.row)"
                                size="small"
                                type="danger"
                                @click="handleDelete(props.row)"
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
                fundCreaAccontList: [],
                loading: true,
                captialTypeList: []
            }
        },
        mounted: function(){
            this.getFundCreaAccounts();
            this.getCaptialType();
        },
        methods:{
            isModify: function (item) {
                return  item.status=='add' || item.status=='edit';
            },
            setModifyStatus: function (row) {
                this.$set(row,'status','edit');
            },
            addECA: function () {
                this.fundCreaAccontList.splice(0,0,{
                    'accountType':'',
                    'accountNo':'',
                    'externalOpenOrganization':'',
                    'status':'add'
                });
            },
            goFundCreaAccountProperties: function(row){
                this.$router.push({ name: 'fund-eca-properties', params: {
                    fundECAId: row.id}});
            },
            getFundCreaAccounts: function(){
                var _self = this;
                _self.winsigns.ds.GET({url:_self.winsigns.api.fund.ecaFromFundURL(_self.$route.params.fundId, ""),
                        data:{}},function(data){
                    _self.loading = false;
                    _self.fundCreaAccontList = data._embedded?data._embedded["external-capital-accounts"]:[];
                })
            },
            postFundECA: function(item){
                var _self = this;
                if (item.status=='add'){//新增
                    _self.winsigns.ds.POST({url:_self.winsigns.api.fund.ecaFromFundURL(_self.$route.params.fundId,""),
                        data:{"accountType":item.accountType,
                        "accountNo":item.accountNo,
                        "externalOpenOrganization":item.externalOpenOrganization}},function(data){
                        _self.getFundCreaAccounts();
                        _self.$message({
                            message: _self.$t('message.global.success'),
                            type: 'success'
                        });
                    },function(err){
                        console.log(err)
                    })
                }else if (item.status=='edit'){
                    _self.winsigns.ds.PUT({url:_self.winsigns.api.fund.ecaURL(item.id),
                        data:{"accountType":item.accountType,
                        "accountNo":item.accountNo,
                        "externalOpenOrganization":item.externalOpenOrganization}},function(data){
                        _self.getFundCreaAccounts();
                        _self.$message({
                            message: _self.$t('message.global.success'),
                            type: 'success'
                        });
                    },function(err){

                    })
                }
            },
            getCaptialType: function () {
                var _self =this;
                _self.winsigns.ds.GET({url:_self.winsigns.api.fund.ecaTypes(),
                    data:{}},function (data) {
                    _self.captialTypeList=
                        data._embedded?data._embedded["eca-types"]:[]
                })
            },
            handleDelete(item) {
               var _self = this;
                _self.$confirm(_self.$t('message.fund.eca_delete_confim'), _self.$t('message.global.prompt'), {
                        confirmButtonText: _self.$t('message.global.confirm'),
                        cancelButtonText: _self.$t('message.global.cancel'),
                        type: 'warning'
                    }).then(() => {
                    _self.winsigns.ds.DELETE({url:_self.winsigns.api.fund.ecaURL(item.id),
                        data:{}},function(data){
                            _self.getFundCreaAccounts();
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