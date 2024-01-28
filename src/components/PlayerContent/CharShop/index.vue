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
@import '@/assets/styles/PlayerContent/Shop/index.scss';
</style>
