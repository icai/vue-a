<template>
    <div class="invest_main_info_top">
        <span class="invest_main_info" v-search="searchData">{{instruct.currency}}</span>
        <span v-search="searchData">{{instruct.costPrice}}</span>
        <div class="invest_auxiliary">
            <span v-search="searchData">{{instruct.currency}}</span>
            <span v-search="searchData">{{instruct.avg}}</span>
        </div>
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