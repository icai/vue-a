<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="当日指令">
                <invest></invest>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Invest from "./invest/Invest.vue"
    export default{
        components:{
            Invest
        }
    }
</script>
<style scoped>
    .el-tab-pane{
        min-height: 300px;
    }
</style>