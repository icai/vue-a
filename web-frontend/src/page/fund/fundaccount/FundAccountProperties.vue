<template> 
    <div>
        <div class="line_margin_top"></div>
        <el-row>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="20">
                <fund-portfolios></fund-portfolios>
            </el-col>            
        </el-row>

    </div>
</template>
<script>
    import fundPortfolios from "./FundPortfolios.vue"
    export default{
        data(){
            return {
                loading: true
            }
        },
        components: {
            fundPortfolios
		},
        methods:{

        }
    }
</script>
<style scoped>   

</style>