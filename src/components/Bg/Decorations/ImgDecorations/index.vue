<template>
  <img
    :src="currentImage"
    alt=" "
    class="decoration"
  >
</template>

<script>
export default {
  name: 'ImgDecorations',
  props: ['images'],
  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
    };
  },
  mounted() {
    this.startAnimation();
  },
  beforeUnmount() {
    this.stopAnimation();
  },
  methods: {
    startAnimation() {
      this.animationIntervalId = setInterval(this.changeImage, 100);
    },
    stopAnimation() {
      clearInterval(this.animationIntervalId);
    },
    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
};
</script>

<style lang="scss">
.decoration {
  position: relative;
  z-index: 10;
  will-change: transform;
  height: 50%;
  bottom: 0;
}
</style>
