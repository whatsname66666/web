<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const iconName = computed(() => `#${props.iconClass}`);
const svgClass = computed(() => {
  if (props.className) {
    return "svg-icon " + props.className;
  } else {
    return "svg-icon";
  }
});
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!-- 使用 v-bind="$attrs" 传递其他属性 -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 通过 CSS color 属性控制图标颜色 */
  overflow: hidden;
}
</style>
