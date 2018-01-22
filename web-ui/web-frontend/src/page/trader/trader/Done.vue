<template>
    <div>
        <el-row>
            <div style="width: 452px;">
               <el-table :data="doneList" v-loading="loading" element-loading-text="提交中">

                   <el-table-column label="成交价" width="150">
                       <template scope="props">
                           <div v-if="props.row.editer">
                               <el-input v-model="done.donePrice"></el-input>
                           </div>
                           <div v-else>
                               {{props.row.donePrice}}
                           </div>
                       </template>
                   </el-table-column>
                   <el-table-column label="成交数量" width="150">
                       <template scope="props">
                           <div v-if="props.row.editer">
                               <el-input v-model="done.doneQty"></el-input>
                           </div>
                           <div v-else>
                               {{props.row.doneQuantity}}
                           </div>
                       </template>
                   </el-table-column>
                   <el-table-column label="成交时间" width="150">
                       <template scope="props">
                           <div v-if="props.row.editer">
                               <el-button type="text" @click.native="saveDone(props.row)">保存</el-button>
                           </div>
                           <div v-else>
                               {{props.row.doneTime | time}}
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
            </div>
            <div>
                <el-button type="text" @click.native="addDone">添加</el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
    import * as types from "../../../store/types"
    export default{
        data(){
           return {
               loading: false,
               done:{
                   donePrice:0,
                   doneQty:0
               }
           }
        },
        props:['entrust'],
        components:{

        },
        computed: {
            doneList: function(){
                return this.$store.state.trader.doneList;
            }
        },
        methods:{
            addDone: function () {
                this.$store.commit(types.TRADER_ADD_DONE);
            },
            saveDone: function (item) {
                var _self=this;
                _self.loading = true;
                this.$store.dispatch('trader_addDone',{item:this.done,entrust:this.entrust}).then(() => {
                    _self.loading = false;
                });
            }
        }
    }
</script>
<style scoped>
    .done{
        min-height: 450px;
        border:1px solid #D6D6D6;
    }
    .arrow{
        display: inline-block;
        border-top: 30px solid transparent;
        border-right: 17px solid #D6D6D6;
        border-bottom: 30px solid transparent;
        position: relative;
        top: 132px;
        left: -17px;
    }
</style>