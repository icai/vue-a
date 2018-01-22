<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-select  v-model="priceType" @change="updateEntrust()"
                            @click.stop.native="" placeholder="请选择">
                    <el-option
                            v-for="item in priceTypeList"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input v-model="entrustPrice" @blur="updateEntrust()"
                          @click.stop.native=""></el-input>
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
            priceTypeList: function(){
                return this.$store.state.trader.priceTypeList;
            },
            priceType: {
                get () {
                    return this.$store.state.trader.formData.priceType
                },
                set(value){
                    this.$store.commit(types.TRADER_FORM_PRICETYPE,value);
                }
            },
            entrustPrice:{
                get () {
                    return this.$store.state.trader.formData.entrustPrice
                },
                set(value){
                    this.$store.commit(types.TRADER_FORM_ENTRUSTPRICE,value);
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