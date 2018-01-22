<template>
    <div>
        <el-row>
            <el-col :span="24">
                <trader-head></trader-head>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><instructs></instructs></el-col>
            <el-col :span="19" class="m_left"><entrusts></entrusts></el-col>
            <!--<el-col :span="4" class="m_left"><done></done></el-col>-->
        </el-row>
    </div>
</template>
<script>
    import TraderHead from './trader/TraderHead.vue'
    import Instructs from './trader/Instructs.vue'
    import Entrusts from './trader/Entrusts.vue'
    import Done from './trader/Done.vue'
    export default{
        components:{
            TraderHead,
            Instructs,
            Entrusts,
            Done
        }
    }
</script>
<style scoped>
 .m_left{
     margin-left:15px;
 }
</style>