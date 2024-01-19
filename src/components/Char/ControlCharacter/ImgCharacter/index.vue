<template>
  <img
    :src="currentImage"
    alt=" "
    :style="[direction, characterPosition, styleChar]"
    class="character"
  >
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ImgCharacter',
  props: ['images', 'direction', 'styleChar', 'state'],
  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
      positionX: 0,
    };
  },
  mounted() {
    emitter.on('update:char-positionX', this.updateCharacterPositionX);
    emitter.on('character-dead', this.handleDeath);
    this.startAnimation();
  },
  beforeUnmount() {
    emitter.off('update:char-positionX', this.updateCharacterPositionX);
    emitter.off('character-dead', this.handleDeath);
    this.stopAnimation();
  },
  watch: {
    state(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentImageIndex = 0;
      }
      if (newVal === 'dead' && oldVal !== 'dead') {
        this.handleDeath();
      }
    },
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
    updateCharacterPositionX(newPositionX) {
      this.positionX = newPositionX;
    },
    handleDeath() {
      this.stopAnimation();
      this.currentImageIndex = this.images.length - 1;
    },
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    characterPosition() {
      return {
        left: `${this.positionX}px`,
      };
    },
  },
};
</script>

<style lang="scss">
.character {
  position: absolute;
  z-index: 10;
  will-change: transform;
  height: 50%;
}
</style>
