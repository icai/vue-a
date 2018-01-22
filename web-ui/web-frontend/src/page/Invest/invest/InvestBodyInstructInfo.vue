<template>
    <div @dblclick="editData">
        <div class="wrap_line">
            <div class="wrap wrap_counter">
                <div class="">
                    <span class="field_color">对手方:</span><span class="span_left">{{ instruct.row.counter }}</span>
                </div>
                <div class="">
                    <span>手机:</span><span class="span_left">{{ instruct.row.countTel }}</span>
                </div>
                <div class="">
                    <span>座机:</span><span class="span_left">{{ instruct.row.countPhone }}</span>
                </div>
                <div class="">
                    <span>备注:</span><span class="span_left">{{ instruct.row.countRemark }}</span>
                </div>
            </div>
            <div class="wrap wrap_recommender">
                <div class="">
                    <span class="field_color">推荐方:</span><span class="span_left">{{ instruct.row.recommender }}</span>
                </div>
                <div class="">
                    <span>手机:</span><span class="span_left">{{ instruct.row.recommenTel }}</span>
                </div>
                <div class="">
                    <span>座机:</span><span class="span_left">{{ instruct.row.recommenPhone }}</span>
                </div>
                <div class="">
                    <span>备注:</span><span class="span_left">{{ instruct.row.recommenRemark }}</span>
                </div>
            </div>
            <div class="wrap">
                <div>
                    <span class="field_color">备注:</span>
                    <span class="span_left">{{ instruct.row.remark }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default{
        props:['instruct'],
        mounted:function () {
            console.log(this.instructData)
        },
        methods:{
            editData: function () {
                console.log('dblclick')
            }
        }
    }
</script>
<style scoped>
    .wrap{
        float: left;
    }
    .wrap_line{
        margin-left: 20px;
        clear:left;
    }
    .wrap_fund{
        width: 250px;
    }
    .warp_security{
        margin-left: 50px;
    }
    .wrap_trader {
        margin-bottom: 10px;
        width: 250px;
    }
    .wrap_cost{
        margin-bottom: 10px;
        width: 250px;
    }
    .wrap_qty_amount{
        margin-bottom: 10px;
        width: 250px;
    }
    .wrap_counter{
        width: 250px;
    }
    .wrap_recommender{
        width: 250px;
    }
    .span_left{
        margin-left: 20px;
    }
    .field_color{
        color:#42d885;
    }
</style>