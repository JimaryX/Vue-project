<template>
  <div class="login-wrap">
    {{data.pageName}}
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from "vue-property-decorator";

  @Component({
    components: {
    }
  })
  export default class Login extends Vue {
    data: any = {
      pageName: "Hello"
    }
  }
</script>
<style lang="scss">
  @import './login.scss';
</style>
