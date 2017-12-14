<template>
    <div>
        <span class="invest_auxiliary" v-search="searchData">{{instruct.investServiceLabel}}</span>
        <div class="invest_main_info" v-search="searchData"><span>{{instruct.investTypeLabel}}</span></div>
    </div>
</template>
<script>
    export default{
        props:['instruct'],
        computed:{
            searchData:function () {
                return this.$store.state.invest.searchData
            }
        }
    }
</script>
<style scoped>

</style>