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
    import InvestBodyInstruct from "./InvestBodyInstruct.vue"
    import InvestBodyInstructBasket from "./InvestBodyInstructBasket.vue"
    export default{
        components:{
            '0':InvestBodyInstruct,
            '1':InvestBodyInstructBasket
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