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
        <img :src="getCoinImage(key)" alt=" " />
        <span>{{ value }}</span>
      </div>
    </div>

    <div class="gem-display" v-if="['Bag', 'Shop', 'Roulette'].includes(tabs[activeTab])" >
      <div class="gem-item" v-for="(value, key) in gems" :key="key">
        <img :src="getGemImage(key)" alt=" " />
        <span>{{ value }}</span>
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

.player-modal {
  position: absolute;
  margin: 4%;
  margin-top: 8%;
  left: 5%;
  width: 80%;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 20px;
  z-index: 1090;
  display: flex;
  flex-direction: row;
  color: white;
  @include pixel-border( 2px, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25) );
}

.gem-display,
.coin-display {
  font-size: 15px;
  position: absolute;
  bottom: 1%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  z-index: 1012;
  height: 3%;

  & span {
    position: relative;
    top: 2px;
  }
}

.coin-display {
  right: 40%;
  width: 12%;
}

.gem-display {
  right: 15%;
  width: 20%;
}

.gem-item,
.coin-item {
  display: flex;
  align-items: center;

  & span {
    color: #fff;
  }
}

.gem-item img,
.coin-item img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
