<template>
    <div>
        <el-row>
            <div>
                <el-input v-model="brokerageFirm" @blur="updateEntrust()"></el-input>
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
            brokerageFirm: {
                get () {
                    return this.$store.state.trader.formData.brokerageFirm
                },
                set(value){
                    this.$store.commit(types.TRADER_FORM_BROKERAGEFIRM,value);
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