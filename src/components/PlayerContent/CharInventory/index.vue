<template>
  <button class="show-inventory" @click="toggleInventory"></button>

  <ModalWindow
    :tabs="['Bag', 'Book', 'Forge']"
    :show="show"
    :coins="player.money.coins"
    :gems="player.money.gems"
    @close="toggleInventory"
    @activeTab="activeTab = $event"
    baseClass="inventory"
  >
    <div v-if="activeTab === 0" class="inventory-player__info">
      <div class="inventory-player__bg-img">
        <ImgDecorations
          :isActive="true"
          :cycleIntervalSpeed="1000"
          :styleDecoration="styleCharInInventory"
          :images="player.currentCharacter.animations.idle"
        />
      </div>

      <div class="inventory-player__characteristics">
        <!-- dot animation
        <ImgDecorations
          :isActive="true"
          :images="DecorationAnimations.chest.goldChest.open"
          :styleDecoration=""
          :cycleIntervalSpeed="1000"
        />
        -->
        <p>Health: {{ player.maxHealth }}</p>
        <p>Speed: {{ player.walkingSpeed }}-{{ player.runningSpeed }}</p>

        <p>Attack: {{ player.attacks.attack.damage }}-{{ player.attacks.attack3.damage }}</p>
      </div>
    </div>

    <DragCells v-if="activeTab === 0" />

    <div v-if="activeTab === 1" class="inventory-book">
      <h2>Book</h2>
      <!-- Display Book here -->
    </div>

    <div v-if="activeTab === 2" class="inventory-forge">
      <h2>Forge</h2>
      <!-- Display Forge here -->
    </div>
  </ModalWindow>
</template>

<script>
// only dots is used, need fix imports
import { DecorationAnimations } from '@/assets/decorations/DecorationAnimations';
import ModalWindow from '../ModalWindow/index.vue';
import ImgDecorations from '../../Decorations/ImgDecorations/index.vue';
import DragCells from './DragCells/index.vue';

export default {
  name: 'CharInventory',

  props: ['player', 'show'],

  components: {
    ImgDecorations,
    DragCells,
    ModalWindow,
  },

  data() {
    return {
      activeTab: 0,
      DecorationAnimations,
    };
  },

  methods: {
    toggleInventory() {
      this.$emit('toggle-inventory', 'inventory');
    },
  },

  computed: {
    styleCharInInventory() {
      return {
        position: 'absolute',
        height: '40%',
        top: '0%',
      };
    },
  },

  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'i' || event.key === 'I') {
        this.openInventory();
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

.inventory {
  &-player{
    &__info {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 100%;
      border-radius: 20px;
    }

    &__bg-img {
      display: flex;
      flex-direction: column;
      width: 95%;
      height: 33%;
      padding: 2%;
      background-image: url('@/assets/bg/inventoryBg.png');
      background-size: cover;
      background-position: bottom;
      @include pixel-border( 2px, rgba(229, 229, 229, 0.45),  rgba(0, 0, 0, 0) );

      & img {
        width: 40%;
        object-fit: contain;
      }
    }

    &__characteristics {
      padding: 5%;
      padding-left: 1%;
      text-align: initial;
      position: relative;
      bottom: -10%;
      height: 36%;
      color: rgba(0, 0, 0, 0.8);
      background-color: #c8b400;
      @include pixel-border( 2px, rgba(213, 184, 0, 0.45),  rgba(0, 0, 0, 0) );

      & p {
        font-size: 18px;
        white-space: nowrap;
        position: relative;
        top: -18%;
      }
    }
  }

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
        background-image: url('@/assets/items/icons/bag2.png');
      }

      &:nth-child(2) {
        background-image: url('@/assets/items/icons/book.png');
      }

      &:nth-child(3) {
        background-image: url('@/assets/items/icons/forge.png');
      }
    }
  }
}

.show-inventory {
  z-index: 999;
  position: absolute;
  top: 2%;
  right: 2%;
  background-image: url('@/assets/items/icons/bag.png');
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

  .inventory-tab-icons button {
    height: 44px;
    width: 44px;
  }

  .inventory-player__characteristics p {
    font-size: 12px;
  }
}
</style>
