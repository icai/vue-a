<template>
    <div>
        <top-menu></top-menu>
        <el-row style="top: 80px;">
            <el-col :offset="2" :span="20">
                <transition name="router">
                    <router-view></router-view>
                </transition>
            </el-col>
        </el-row>
        <main-footer></main-footer>
    </div>
</template>
<script>
import TopMenu from "./head/TopMenu.vue"
import MainFooter from "./head/MainFooter.vue"
export  default{
    components: {
        TopMenu,
        MainFooter
    }
}

</script>
<style scoped>

</style>