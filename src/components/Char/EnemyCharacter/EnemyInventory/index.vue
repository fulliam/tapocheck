<template>
  <div
    v-if="isOpen"
    class="enemy-inventory"
    :style="{left: positionX + 'px'}"
  >
    <button class="close" @click="isOpen = false">X</button>

    <div v-for="(item, index) in items" :key="index" class="enemy-inventory-item">
      <img
        :src="item.image"
        :style="{ background: rarityGradients[item.rarity] }"
        alt=" " />

      <div class="tooltip">
        <div class="item-stats">
          <div :style="{ color: rarityColors[item.rarity] }">
            {{ item.rarity }}
          </div>
          <div>{{ item.name }}</div>
          <div>Attack: {{ item.stats.attack }}</div>
          <div>Defense: {{ item.stats.defense }}</div>
        </div>
      </div>
    </div>
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
    items: {
      type: Array,
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

  computed: {
    rarityGradients() {
      return {
        common: 'radial-gradient(circle at center, #c0c0c0, #808080)', // Серый градиент
        rare: 'radial-gradient(circle at center, #7FFF00, #006400)', // Зеленый градиент
        unique: 'radial-gradient(circle at center, #1E90FF, #00008B)', // Синий градиент
        mythic: 'radial-gradient(circle at center, #EE82EE, #4B0082)', // Фиолетовый градиент
        legendary: 'radial-gradient(circle at center, #FFD700, #8B6508)', // Золотой градиент
      };
    },
    rarityColors() {
      return {
        common: '#c0c0c0', // Серый
        rare: '#7FFF00', // Зеленый
        unique: ' #1E90FF', // Синий
        mythic: '#EE82EE', // Фиолетовый
        legendary: '#FFD700', // Золотой
      };
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
  display: grid;
  grid-gap: 2px;
  grid-template-columns: 1fr 1fr;
  @include pixel-border(1px, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));

  &-item {
    position: relative;
    height: 50px;
    width: 50px;
    margin-top: 7px;
    margin-left: 7px;
    background-color: #ccc;
    @include pixel-border( 1px, rgba(229, 229, 229, 0.45), rgba(0, 0, 0, 0) );

    &:nth-child(4) {
      margin-top: 0;
      top: -55px;
    }

    &:nth-child(3) {
      margin-left: 0;
      left: -8px;
    }

    & img {
      width: 100%;
      height: 100%;
    }

    &:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }

    & .tooltip {
      visibility: hidden;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 10px;
      position: absolute;
      z-index: 1013;
      top: 115%;
      left: -50%;
      margin-left: -60%;
      opacity: 0;
      transition: opacity 0.3s;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
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
