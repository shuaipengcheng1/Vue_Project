<template>
  <Suspense>
    <template #default>
      <!-- 第一个模板放对应的需要过度的异步模块 -->
      <router-view />
    </template>
    <template v-slot:fallback>
      <!-- 第二个是用于过度显示的信息 -->
      <h1>正在加载中</h1>
    </template>
  </Suspense>

  <Bottom />
</template>

<script>
import Bottom from "./components/bottomBtn.vue";

export default {
  components: {
    Bottom,
  },
  setup() {
    return {
      Bottom,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
