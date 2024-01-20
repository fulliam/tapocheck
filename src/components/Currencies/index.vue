<template>
  <img
    v-if="!collection"
    :src="currentImage"
    alt=" "
    :style="[currencyPosition, filterStyle]"
    class="currency"
  >
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ImgCurrencies',
  props: ['images', 'currentAct', 'positionX', 'currencyId'],
  data() {
    return {
      currentImageIndex: 0,
      animationIntervalId: null,
      currencyPositionX: this.positionX,
      playerPositionX: 0,
      collection: false,
    };
  },
  mounted() {
    emitter.on('update:position', this.updatePositionIfPlayerMove);
    this.startAnimation();
  },
  beforeUnmount() {
    emitter.off('update:position', this.updatePositionIfPlayerMove);
    this.stopAnimation();
  },
  methods: {
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
      if (distance >= -200 && distance <= 200) {
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
          left: `${this.currencyPositionX}px`, bottom: '15%',
        };
      }
      return {
        left: `${this.currencyPositionX}px`, bottom: '30%',
      };
    },
    filterStyle() {
      let filterValue = ''; // Значение по умолчанию

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
  height: 3%;
}
</style>
