<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-cascader
                        :options="fundTreeData"
                        v-model="fundPortf"
                        @change="fundSelected"
                        @click.stop.native="">
                </el-cascader>
            </el-col>
            <el-col :span="2">
                <el-tooltip v-if="instruct.errors && instruct.errors.portfolioId"　style="margin-top:10px"
                        effect="light" :content="instruct.errors.portfolioId" placement="top-start">
                    <el-icon name="information"></el-icon>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import * as types from "../../../store/types"
    export default{
        data(){
            return{

            }
        },
        props:['instruct'],
        mounted:function () {
            this.$store.dispatch('invest_fundTree');
        },
        computed: {
            ...mapGetters({
                fundTreeData: 'invest_fund_tree',
                fundPortf: 'invest_edit_data_fundTree'
            })
        },
        methods:{
            fundSelected: function(value){
                this.$store.commit(types.INVEST_FORM_FUNDPORTF, value);
                this.$store.dispatch('invest_updateInstruct',{item:this.instruct})
            }
        }
    }
</script>
<style scoped>

</style>