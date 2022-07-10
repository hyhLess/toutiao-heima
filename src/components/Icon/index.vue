<template>
  <i :class="'icon-' + name"></i>
</template>

<script>
export default {
  name: "icon",
  props: {
    name: String,
  },
};
</script>

<style>
@import url("./iconfont.css");
</style>