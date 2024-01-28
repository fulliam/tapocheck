<template>
  <div
    v-if="isOpen"
    class="enemy-inventory"
    :style="{left: positionX + 'px'}"
  >
    <button class="close" @click="isOpen = false">X</button>
    <!-- Здесь будет код для отображения инвентаря врага -->
  </div>
</template>

<script>
export default {
  name: 'EnemyInventory',

  props: {
    enemyIsDead: {
      type: Boolean,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleInventory() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/PixelBorder/index.scss';

.enemy-inventory {
  position: fixed;
  bottom: 20%;
  width: 15%;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1030;
  @include pixel-border(1px, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));
}

.close {
    position: absolute;
    right: -15px;
    top: -15px;
    width: 60px;
    height: 60px;
    box-shadow: none;
    border: none;
    background-color: transparent;
    color: brown;
}
</style>
