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
        <!-- player char in inventory -->
        <ImgDecorations
          :isActive="true"
          :cycleIntervalSpeed="1000"
          :styleDecoration="styleCharInInventory"
          :images="player.currentCharacter.animations.idle"
        />
      </div>

      <div class="inventory-player__characteristics">
        <p>Health: {{ player.maxHealth }}</p>
        <p>Speed: {{ player.walkingSpeed }}-{{ player.runningSpeed }}</p>

        <p>Attack: {{ player.attacks.attack.damage }}-{{ player.attacks.attack3.damage }}</p>
      </div>
    </div>

    <DragCells :items="player.inventory" v-if="activeTab === 0" />

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
        this.toggleInventory();
      }
    });
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/PlayerContent/Inventory/index.scss';
</style>
