<template>
    <div>
        <el-row>
            <transition name="router">
                <component :is="main_status"></component>
            </transition>
        </el-row>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import InvestHeadInstruct from "./InvestHeadInstruct.vue"
    import InvestHeadInstructBasket from "./InvestHeadInstructBasket.vue"
    export default{
        data(){
            return{

            }
        },
        components:{
            '0':InvestHeadInstruct,
            '1':InvestHeadInstructBasket
        },
        computed: {
            ...mapGetters({
                main_status: 'invest_main_status'
            })
        }
    }
</script>
<style scoped>

</style>