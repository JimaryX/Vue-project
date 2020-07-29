<template>
  <div class="login-wrap">
    {{data.pageName}}
    <button @click="click">点击发送</button>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { postSomeThings } from "@/api/main.ts";
  @Component({
    components: {
    }
  })
  export default class Login extends Vue {
    data: any = {
      pageName: "Hello"
    };

    click() {
      postSomeThings("good").then(t => {
        console.log("OK");
      }).catch(err => {
        console.log("Error")
      })
    }
    created() {
      //
    }

    activated() {
      //
    }
    mounted() {
      //
    }
    // 初始化函数
    init() {
      //
    }
  }
</script>
<style lang="scss">
  @import './login.scss';
</style>
