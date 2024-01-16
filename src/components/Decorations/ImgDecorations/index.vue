<template>
  <img
    v-show="isActive"
    :src="currentImage"
    :style="[styleDecoration, decorationPosition, direction]"
    alt=" "
    class="decoration"
  >
</template>

<script>
export default {
  name: 'ImgDecorations',
  props: ['images', 'styleDecoration', 'charPosition', 'direction', 'isActive'],
  data() {
    return {
      currentImageIndex: 0,
      cycleIntervalId: null,
    };
  },
  mounted() {
    this.cycleIntervalId = setInterval(this.startAnimation, 2400);
  },
  beforeUnmount() {
    clearInterval(this.cycleIntervalId);
    clearInterval(this.animationIntervalId);
  },
  methods: {
    startAnimation() {
      this.currentImageIndex = 0;
      this.animationIntervalId = setInterval(() => {
        this.changeImage();

        if (this.currentImageIndex === this.images.length - 1) {
          clearInterval(this.animationIntervalId);
        }
      }, 75);
    },
    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    decorationPosition() {
      if (this.direction) {
        return {
          left: `calc(${this.charPosition}px + 15%)`,
          transform: 'scale(-1, 1)',
        };
      }
      return {
        left: `calc(${this.charPosition}px - 13%)`,
        transform: 'none',
      };
    },
  },
};
</script>

<style lang="scss">
.decoration {
  position: absolute;
  z-index: 10;
  will-change: transform;
  height: 30%;
  bottom: 0;
}
</style>
