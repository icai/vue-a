<template>
    <div>
        <el-row style="margin-bottom: 20px;">
            <el-col :offset="5" :span="19" >
                <div style="margin-left: 15px;">
                    <el-button @click.native="createEntrust">创建委托</el-button>
                    <el-button @click.native="deleteEntrust">删除</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        computed:{
            selectedInstruct: function () {
                return this.$store.state.trader.selectedInstruct;
            }
        },
        components:{

        },
        methods:{
            createEntrust: function () {
                var _self = this;
                if (!_self.selectedInstruct.id){
                    _self.$message.error('请选择指令!');
                    return;
                }
                _self.$store.dispatch('trader_createEntrust').then(() => {

                });
            },
            deleteEntrust: function () {
                var _self = this;

                _self.$confirm('正在删除委托，是否继续？',
                    _self.$t('message.global.prompt'), {
                        confirmButtonText: _self.$t('message.global.confirm'),
                        cancelButtonText: _self.$t('message.global.cancel'),
                        type: 'warning'
                    }).then(() => {
                    _self.$store.dispatch('trader_deleteEntrust').then(() => {
                        _self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        _self.$store.dispatch('trader_getEntrusts').then(() => {

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

</style>