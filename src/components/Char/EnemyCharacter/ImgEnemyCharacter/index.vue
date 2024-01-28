<template>
  <img
    :src="currentImage"
    alt=" "
    :style="[direction, jump, characterPosition, styleEnemy]"
    class="enemy"
  >
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ImgEnemyCharacter',
  props: ['images', 'direction', 'jump', 'positionX', 'styleEnemy', 'state', 'animationSpeed', 'enemyId'],
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
    emitter.on('refresh-enemy', this.refreshEnemy);
    this.startAnimation();
  },
  beforeUnmount() {
    emitter.off('update-enemy-position', this.updateCharacterPosition);
    emitter.off('enemy-dead', this.handleDeath);
    emitter.off('refresh-enemy', this.refreshEnemy);
    this.stopAnimation();
  },
  watch: {
    state(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentImageIndex = 0;
      }
      if (newVal === 'dead' && oldVal !== 'dead') {
        this.handleDeath(this.enemyId);
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
    handleDeath(enemyId) {
      if (this.enemyId === enemyId) {
        this.stopAnimation();
        this.currentImageIndex = (this.images?.length ?? 0) - 1;
      }
    },
    refreshEnemy(enemyId) {
      if (this.enemyId === enemyId) {
        this.startAnimation();
      }
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
.enemy {
  position: absolute;
  z-index: 10;
  will-change: transform;
  height: 50%;
}
</style>
