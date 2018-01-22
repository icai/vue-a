<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-select v-model="traderType" @change="updateInstruct()"
                           @click.stop.native="" placeholder="请选择">
                    <el-option
                            v-for="item in traderTypeList"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-tooltip v-if="instruct.errors && instruct.errors.investType"　style="margin-top:10px"
                        effect="light" :content="instruct.errors.investType" placement="top-start">
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
        props:['instruct'],
        computed: {
            traderTypeList: function(){
                return this.$store.state.invest.traderTypeList;
            },
            //买卖类型
            traderType:{
                get () {
                    return this.$store.state.invest.formData.traderType
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_TRADERTYPE,value);
                }
            }
        },
        methods:{
            updateInstruct: function(){
                this.$store.dispatch('invest_updateInstruct',{item:this.instruct})
            }
        }
    }
</script>
<style scoped>

</style>