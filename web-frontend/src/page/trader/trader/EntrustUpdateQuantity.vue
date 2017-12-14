<template>
    <div>
        <el-row>
            <div>
                <el-input v-model="entrustQuantity" @blur="updateEntrust()"></el-input>
            </div>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        components:{

        },
        props:['entrust'],
        computed: {
            //委托量
            entrustQuantity: {
                get () {
                    return this.$store.state.trader.formData.entrustQuantity
                },
                set(value){
                    this.$store.commit(types.TRADER_FORM_ENTRUSTQUANTITY,value);
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