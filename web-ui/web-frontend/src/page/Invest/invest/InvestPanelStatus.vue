<template>
    <div>
        <div v-if="instruct.editer">
        </div>
        <div v-else-if="instruct.executionStatus=='COMMITING'">
            <img src="../../../assets/images/trader1.jpg">
        </div>
    </div>
</template>
<script>
    export default{
        props:['instruct']
    }
</script>
<style scoped>

</style>