<template>
    <div>
        <span class="invest_auxiliary space"  v-search="searchData">{{instruct.fundName}}/{{instruct.fundAccName}}</span><br>
        <span class="invest_main_info" v-search="searchData">{{instruct.portfolioName}}</span>
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