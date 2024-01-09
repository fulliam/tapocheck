<template>
  <img
    :src="currentImage"
    alt=" "
    :style="[direction, jump, characterPosition]"
    class="character"
  >
  <div class="hitbox" :style="[hitboxPosition]"></div>
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ImgEnemyCharacter',
  props: ['images', 'direction', 'jump'],
  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
      position: {
        x: 0,
      },
    };
  },
  mounted() {
    emitter.on('update-enemy-position', this.updateCharacterPosition);
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
    updateCharacterPosition(x) {
      this.position.x = x;
    },
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    characterPosition() {
      return {
        left: `${this.position.x}px`, bottom: '25%',
      };
    },
    hitboxPosition() {
      return {
        left: `${(this.position.x + 130)}px`, bottom: '23%',
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

.hitbox {
  position: absolute;
  z-index: 10;
  will-change: transform;
  height: 280px;
  width: 180px;
  border: 3px solid violet;
}
</style>
