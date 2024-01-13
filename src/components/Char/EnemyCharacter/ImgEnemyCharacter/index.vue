<template>
  <img
    :src="currentImage"
    alt=" "
    :style="[direction, jump, characterPosition, styleEnemy]"
    class="character"
  >
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ImgEnemyCharacter',
  props: ['images', 'direction', 'jump', 'positionX', 'styleEnemy', 'state', 'animationSpeed'],
  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
      position: {
        x: this.positionX,
      },
    };
  },
  mounted() {
    emitter.on('update-enemy-position', this.updateCharacterPosition);
    emitter.on('enemy-dead', this.handleDeath);
    this.startAnimation();
  },
  beforeUnmount() {
    emitter.off('update-enemy-position', this.updateCharacterPosition);
    emitter.off('enemy-dead', this.handleDeath);
    this.stopAnimation();
  },
  watch: {
    state(newVal, oldVal) {
      if (newVal === 'dead' && oldVal !== 'dead') {
        this.handleDeath();
      }
    },
  },
  methods: {
    startAnimation() {
      const interval = this.animationSpeed || 100;
      this.animationIntervalId = setInterval(this.changeImage, interval);
    },
    stopAnimation() {
      clearInterval(this.animationIntervalId);
    },
    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    updateCharacterPosition(x) {
      this.position.x = x;
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
        left: `${this.positionX}px`, bottom: '25%',
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
