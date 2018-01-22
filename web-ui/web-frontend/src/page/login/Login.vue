<template>
  <div>
      <transition name="login">
        <component :is="loginstatus" v-on:setLoginStatus="setLoginStatus"></component>
      </transition>
  </div>
</template>

<script>
  import LoginUserPass from './LoginUserPass.vue'
  import LoginDoubleFactor from './LoginDoubleFactor.vue'
  export default{
      data(){
          return{
              loginstatus: '0'
          }
      },
      components:{
          '0':LoginUserPass,
          '1':LoginDoubleFactor
      },
      mouted(){
          var _self = this;
          this.$on('setLoginStatus', function (status) {
              console.log('gdgdfg')
              _self.loginstatus = status;
          })
      },
      methods:{
          setLoginStatus: function (status) {
              this.loginstatus = status;
          }
      }
  }
</script>

<style scoped>

</style>
