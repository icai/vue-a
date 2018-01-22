<template>
    <div>
        <span class="invest_auxiliary" v-search="searchData">{{instruct.quantity}}</span><span>股</span>
        <div class="invest_main_info">
            <span v-search="searchData">{{instruct.amount}}</span><span>万</span>
        </div>
        <div>
            <el-progress :percentage="100" status="success"></el-progress>
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