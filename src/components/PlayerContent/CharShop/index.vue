<template>
  <button class="show-shop" @click="toggleShop"></button>
  <ModalWindow
    :tabs="['Shop', 'Donate', 'Roulette']"
    :show="show"
    :coins="player.money.coins"
    :gems="player.money.gems"
    @close="toggleShop"
    @activeTab="activeTab = $event"
    baseClass="shop"
  >
    <div v-if="activeTab === 0" class="shop-***__***">
      <h2>shop</h2>
      <div class="shop-***__***">

      </div>

      <div class="shop-***__***">

      </div>
    </div>

    <div v-if="activeTab === 1" class="shop-donate">
      <h2>donate</h2>
      <!-- Display donate here -->
    </div>

    <div v-if="activeTab === 2" class="shop-roulette">
      <h2>roulette</h2>
      <!-- Display roulette here -->
    </div>
  </ModalWindow>
</template>

<script>
import ModalWindow from '../ModalWindow/index.vue';

export default {
  name: 'CharShop',

  props: ['player', 'show'],

  components: {
    ModalWindow,
  },

  data() {
    return {
      activeTab: 0,
    };
  },

  methods: {
    toggleShop() {
      this.$emit('toggle-shop', 'shop');
    },
  },

  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'e' || event.key === 'E') {
        this.toggleShop();
      }
    });
  },
};
</script>

<style lang="scss">
@mixin pixel-border( $width, $color, $bgcolor ) {
  box-shadow:
    4*$width 0 $bgcolor,
    -4*$width 0 $bgcolor,
    0 (-4*$width) $bgcolor,
    0 4*$width $bgcolor,
    $width 0 0 2*$width $bgcolor,
    -$width 0 0 2*$width $bgcolor,
    0 (-$width) 0 2*$width $bgcolor,
    0 $width 0 2*$width $bgcolor,
    5*$width 0 $color,
    -5*$width 0 $color,
    0 (-5*$width) $color,
    0 5*$width $color,
    0 0 0 3*$width $color,
    0 2*$width 0 2*$width $color,
    0 (-2*$width) 0 2*$width $color,
    2*$width 0 0 2*$width $color,
    (-2*$width) 0 0 2*$width $color;
}

.shop {
  &-tab-icons {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -12%;
    right: 12%;

    & button {
      background-size: cover;
      background-position: center;
      height: 60px;
      width: 60px;
      box-shadow: none;
      border: none;
      background-color: transparent;

      &:hover {
        filter: drop-shadow(0 0 1rem #ccc);
      }

      &:nth-child(1) {
        background-image: url('@/assets/items/icons/coins.png');
      }

      &:nth-child(2) {
        background-image: url('@/assets/items/icons/money.png');
      }

      &:nth-child(3) {
        background-image: url('@/assets/items/icons/roll.png');
      }
    }
  }
}

.show-shop {
  z-index: 999;
  position: absolute;
  top: 2%;
  right: 8%;
  background-image: url('@/assets/items/icons/coin.png');
  background-size: cover;
  background-position: center;
  height: 70px;
  width: 70px;
  box-shadow: none;
  border: none;
  background-color: transparent;

  &:hover {
    filter: drop-shadow(0 0 1rem #ccc);
  }

  &__false {
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
}

@media (max-height: 536px), (max-width: 992px) {
  .gem-item,
  .coin-item {
    font-size: 10px;

    & img {
      height: 15px;
      width: 15px;
    }
  }

  .coin-display {
    right: 48%;
    width: 12%;
  }

  .gem-display {
    right: 19%;
    width: 20%;
  }

  .shop-tab-icons button {
    height: 44px;
    width: 44px;
  }

  .shop-player__characteristics p {
    font-size: 12px;
  }
}
</style>
