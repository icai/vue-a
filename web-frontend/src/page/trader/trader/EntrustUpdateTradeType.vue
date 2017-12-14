<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-select v-model="tradeType" @change="updateEntrust()"
                           @click.stop.native="" placeholder="请选择">
                    <el-option
                            v-for="item in traderTypeList"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-tooltip v-if="entrust.errors && entrust.errors.tradeType"　style="margin-top:10px"
                            effect="light" :content="entrust.errors.tradeType" placement="top-start">
                    <el-icon name="information"></el-icon>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        data(){
           return{

           }
        },
        components:{

        },
        props:['entrust'],
        computed: {
            //委托量
            traderTypeList: function(){
                return this.$store.state.trader.traderTypeList;
            },
            tradeType: {
                get () {
                    return this.$store.state.trader.formData.traderType
                },
                set(value){
                    this.$store.commit(types.TRADER_FORM_TRADERTYPE,value);
                }
            }
        },
        methods:{
            updateEntrust: function(){
                this.$store.dispatch('trader_updateEntrust',{item:this.entrust})
            }
        }
    }
</script>
<style scoped>

</style>