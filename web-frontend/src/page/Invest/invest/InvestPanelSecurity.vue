<template>
    <div>
        <span class="invest_auxiliary" v-search="searchData">{{instruct.market}}</span>
        <div class="invest_main_info"><span v-search="searchData">{{instruct.securityCode}}</span>
            <span v-search="searchData">{{instruct.securityName}}</span></div>
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