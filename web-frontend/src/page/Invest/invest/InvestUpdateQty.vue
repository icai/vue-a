<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-input v-model="quantity" @click.stop.native=""
                          @focus="setFocus('qty')"
                          @blur="updateInstruct()"></el-input>
            </el-col>
            <el-col :span="12">
                <el-input v-model="amount" @click.stop.native=""
                          @focus="setFocus('amount')"
                          @blur="updateInstruct()"></el-input>
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
            //数量
            quantity:{
                get () {
                    return this.$store.state.invest.formData.quantity
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_VOLUMETYPE,'FixedType');
                    this.$store.commit(types.INVEST_FORM_QTY,value);
                }
            },
            //金额
            amount:{
                get () {
                    return this.$store.state.invest.formData.amount
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_VOLUMETYPE,'AmountType');
                    this.$store.commit(types.INVEST_FORM_AMOUNT,value);
                }
            }
        },
        methods:{
            updateInstruct: function(){
                this.$store.commit(types.INVEST_FORM_FOCUS,'');
                this.$store.dispatch('invest_updateInstruct',{item:this.instruct})
            },
            setFocus: function (value) {
                this.$store.commit(types.INVEST_FORM_FOCUS,value);
            }
        }
    }
</script>
<style scoped>

</style>