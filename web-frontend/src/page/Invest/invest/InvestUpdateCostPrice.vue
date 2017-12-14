<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-select  v-model="currency" @change="updateInstruct()"
                            @click.stop.native="" placeholder="请选择">
                    <el-option
                            v-for="item in currencyList"
                            :label="item.label"
                            :value="item.value"
                            >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input v-model="costPrice" @blur="updateInstruct()"
                          @focus="setFocus()"
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
        props:['instruct'],
        computed: {
            currencyList: function(){
                return this.$store.state.invest.currencyList;
            },
            //币种change
            currency:{
                get () {
                    return this.$store.state.invest.formData.currency
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_CURRENCY,value);
                }
            },
            //成本价
            costPrice:{
                get () {
                    return this.$store.state.invest.formData.costPrice
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_COSTPRICE,value);
                }
            }
        },
        methods:{
            updateInstruct: function(){
                this.$store.commit(types.INVEST_FORM_FOCUS,'');
                this.$store.dispatch('invest_updateInstruct',{item:this.instruct})
            },
            setFocus: function () {
                this.$store.commit(types.INVEST_FORM_FOCUS,'costPrice');
            }
        }
    }
</script>
<style scoped>

</style>