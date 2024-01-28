<template>
  <div v-if="show" :class="`${baseClass} player-modal`">
    <button :class="`show-${baseClass}__false`" @click="close">X</button>
    <slot></slot>

    <div :class="`${baseClass}-tab-icons`">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="setActiveTab(index)"
      >
      </button>
    </div>

    <div class="coin-display" v-if="['Bag', 'Shop', 'Roulette'].includes(tabs[activeTab])" >
      <div class="coin-item" v-for="(value, key) in coins" :key="key">
        <span>{{ value }}</span>
        <img :src="getCoinImage(key)" alt=" " />
      </div>
    </div>

    <div class="gem-display" v-if="['Bag', 'Shop', 'Roulette'].includes(tabs[activeTab])" >
      <div class="gem-item" v-for="(value, key) in gems" :key="key">
        <span>{{ value }}</span>
        <img :src="getGemImage(key)" alt=" " />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',

  props: {
    tabs: {
      type: Array,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    baseClass: {
      type: String,
      required: true,
    },
    coins: {
      type: Object,
      required: true,
    },
    gems: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeTab: 0,
    };
  },

  methods: {
    close() {
      this.$emit('close');
    },

    setActiveTab(index) {
      this.activeTab = index;
      this.$emit('activeTab', this.activeTab);
    },

    /* eslint-disable */
    getCoinImage(key) {
      return require(`@/assets/currencies/coins/${key}/${key}Coin1.png`);
    },

    getGemImage(key) {
      return require(`@/assets/currencies/gems/${key}/${key}Gem1.png`);
    },
    /* eslint-enable */
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/PlayerContent/ModalWindow/index.scss';
</style>
