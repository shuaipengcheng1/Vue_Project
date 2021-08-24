<template>

  <Suspense>
    <template #default>
      <!-- 第一个模板放对应的需要过度的异步模块 -->
      <Part />
    </template>
    <template v-slot:fallback>
      <!-- 第二个是用于过度显示的信息 -->
      <h1>正在加载中</h1>
    </template>
  </Suspense>
 
</template>

<script>

import { defineComponent } from "vue";
import Part from "../components/part._box.vue";
// import Request from "../hooks/axios";
export default defineComponent({

  components: {
    Part,
 
  },
  setup() {},
});
</script>