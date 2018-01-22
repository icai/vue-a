<template>
    <div>
        <el-row>
            <el-col :span="22">
                <el-input v-model="security" @click.stop.native=""
                          @focus="setFocus()"
                          @blur="updateInstruct()"></el-input>
            </el-col>
            <el-col :span="2">
                <el-tooltip v-if="instruct.errors && instruct.errors.securityId"　style="margin-top:10px"
                        effect="light" :content="instruct.errors.securityId" placement="top-start">
                    <el-icon name="information"></el-icon>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        data(){
            return{

            }
        },
        props:['instruct'],
        mounted:function () {

        },
        computed: {
            //投资标的
            security:{
                get() {
                    return this.$store.state.invest.formData.security;
                },
                set(value){
                    this.$store.commit(types.INVEST_FORM_SECURITY, value);
                }
            }
        },
        methods:{
            updateInstruct: function(){
                this.$store.commit(types.INVEST_FORM_FOCUS,'');
                this.$store.dispatch('invest_updateInstruct',{item:this.instruct})
            },
            setFocus: function () {
                this.$store.commit(types.INVEST_FORM_FOCUS,'security');
            }
        }
    }
</script>
<style scoped>

</style>