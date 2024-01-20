<template>
  <img
    ref="currencyImg"
    v-if="!collection"
    :src="currentImage"
    alt=" "
    :style="[currencyPosition, filterStyle]"
    class="currency"
  >
</template>

<script>
import emitter from '@/eventBus';
import { gsap } from 'gsap';

export default {
  name: 'ImgCurrencies',

  props: ['images', 'currentAct', 'positionX', 'currencyId'],

  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
      currencyPositionX: this.positionX,
      currencyPositionY: 0,
      playerPositionX: 0,
      collection: false,
      dropRange: 150,
    };
  },

  mounted() {
    emitter.on('update:position', this.updatePositionIfPlayerMove);
    this.startAnimation();
    this.createDropAnimation();
  },

  beforeUnmount() {
    emitter.off('update:position', this.updatePositionIfPlayerMove);
    this.stopAnimation();
  },

  methods: {
    createDropAnimation() {
      const randomX = Math.random() * 100 - 10;
      const randomY = Math.random() * -90;
      this.currencyPositionX -= randomX;
      gsap.to(this.$refs.currencyImg, {
        duration: 0.65,
        x: randomX,
        y: randomY,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(this.$refs.currencyImg, {
            duration: 0.8,
            y: 0,
            ease: 'bounce.out',
          });
        },
      });
    },

    startAnimation() {
      const intervalSpeed = this.currencyId.includes('gem') ? 150 : 100;
      this.animationIntervalId = setInterval(this.changeImage, intervalSpeed);
    },

    stopAnimation() {
      clearInterval(this.animationIntervalId);
    },

    changeImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },

    updatePositionIfPlayerMove({ direction, speed, playerPositionX }) {
      const leftEdge = 0;
      const rightEdge = window.innerWidth - 350;

      if (direction === 'right' && playerPositionX < rightEdge) {
        this.currencyPositionX -= speed;
      } else if (direction === 'left' && playerPositionX > leftEdge) {
        this.currencyPositionX += speed;
      }

      this.playerPositionX = playerPositionX;
    },

    handleCollection(currencyId) {
      if (this.currencyId === currencyId) {
        this.stopAnimation();
        this.collection = true;
      }
    },

    checkCollection() {
      const distance = this.playerPositionX - this.currencyPositionX;
      if (distance >= -20 && distance <= 20) {
        this.handleCollection(this.currencyId);
      }
    },
  },

  watch: {
    playerPositionX() {
      this.checkCollection();
    },

    currencyPositionX() {
      this.checkCollection();
    },
  },

  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },

    currencyPosition() {
      if (this.currentAct === 'ActVI') {
        return {
          left: `calc(${this.currencyPositionX}px + ${this.dropRange}px)`,
          bottom: `calc(15% - ${this.currencyPositionY}px)`,
        };
      }
      return {
        left: `calc(${this.currencyPositionX}px + ${this.dropRange}px)`,
        bottom: `calc(30% - ${this.currencyPositionY}px)`,
      };
    },

    filterStyle() {
      let filterValue = '';

      if (this.currencyId.includes('gemYellow')) {
        filterValue = 'drop-shadow(0 0 0.75rem rgba(255, 213, 0, 0.637))';
      } else if (this.currencyId.includes('gemGreen')) {
        filterValue = 'drop-shadow(0 0 0.75rem rgba(26, 255, 0, 0.637))';
      } else if (this.currencyId.includes('gemBlue')) {
        filterValue = 'drop-shadow(0 0 0.75rem rgba(0, 149, 255, 0.637))';
      } else if (this.currencyId.includes('gemRed')) {
        filterValue = 'drop-shadow(0 0 0.75rem rgba(255, 55, 0, 0.637))';
      } else if (this.currencyId.includes('gemBGrey')) {
        filterValue = 'drop-shadow(0 0 0.75rem rgba(162, 162, 162, 0.637))';
      } else {
        filterValue = 'none';
      }

      return {
        filter: filterValue,
      };
    },
  },
};
</script>

<style lang="scss">
.currency {
  position: absolute;
  z-index: 10;
  will-change: transform;
  height: 5%;
}
</style>
