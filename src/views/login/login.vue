<template>
  <div class="login-wrap">
    {{data.pageName}}
    <button @click="click">点击发送</button>
    <svg-icon icon-class="error"></svg-icon>
    <ElementTest></ElementTest>
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";
  import { postSomeThings } from "@/api/main.ts";
  @Component({
    components: {
      ElementTest: () => import("../demo/Elementui.vue")
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
