<template>
  <div
    class="custom-cursor"
    :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
  >
    <div class="cursor">
      <img src="./mouse.png" alt=" ">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCursor',
  data() {
    return {
      cursorX: 0,
      cursorY: 0,
    };
  },
  mounted() {
    document.addEventListener('mousemove', this.updateCursorPosition);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.updateCursorPosition);
  },
  methods: {
    updateCursorPosition(event) {
      this.cursorX = event.clientX - 8;
      this.cursorY = event.clientY - 8;
    },
  },
};
</script>

<style lang="scss">
@import url('../../assets/styles/CustomCursor/index.scss');
</style>
