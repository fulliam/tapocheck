<template>
  <div class="health-bar-outer">
    <div class="health-bar-inner" :style="{width: healthPercentage + '%'}">
      <span>{{ player.health }}/{{ player.maxHealth }}</span>
    </div>
  </div>
  <p class="char-name">
    {{ player.currentCharacter.name }}
  </p>

  <ImgCharacter
    :key="player.currentCharacter.name"
    :images="selectedImages"
    :direction="charDirection"
    :styleChar="styleCharInAct"
    :state="keyPressed"
  />

  <!-- archer arrow -->
  <img
    src="@/assets/char/ally/archer/arrow/arrow.png"
    v-for="arrow in arrows"
    :key="arrow"
    :style="{ position: 'absolute',
              left: (arrow.direction === 'left'
                ? arrow.positionX + 0 : arrow.positionX + 350) + 'px',              zIndex: '1001',
              bottom: (currentAct === 'ActVI' ? '15%' : '31%'),
              height: '17%',
              zIndex: 888,
            }"
    alt=" "
  />

  <!-- run animation -->
  <ImgDecorations
    :isActive="keyPressed === 'run'? true : false"
    :images="DecorationAnimations.effect.runSmoke"
    :styleDecoration="styleCharInAct"
    :positionX="positionX"
    :direction="isFacingLeft"
    :cycleIntervalSpeed="2400"
  />

  <ControlButtons :currentCharacter="player.currentCharacter.name" />

  <CharInventory
    v-if="player"
    :player="player"
    :show="showInventory"
    @toggle-inventory="showModalcloseOtherModal('inventory')"
  />

  <CharShop
    v-if="player"
    :player="player"
    :show="showShop"
    @toggle-shop="showModalcloseOtherModal('shop')"
  />
</template>

<script>
import emitter from '@/eventBus';

import { ArcherAnimations } from '@/assets/char/ally/archer/ArcherAnimations';
import { SwordsmanAnimations } from '@/assets/char/ally/swordsman/SwordsmanAnimations';
import { WizardAnimations } from '@/assets/char/ally/wizard/WizardAnimations';
import { SkeletonAnimations } from '@/assets/char/ally/skeleton/SkeletonAnimations';
// only runSmoke is used, need fix imports
import { DecorationAnimations } from '@/assets/decorations/DecorationAnimations';

import ImgDecorations from '../../Decorations/ImgDecorations/index.vue';
import ImgCharacter from './ImgCharacter/index.vue';

import Control from './control';
import ControlButtons from './ControlButtons/index.vue';
import CharInventory from '../../PlayerContent/CharInventory/index.vue';
import CharShop from '../../PlayerContent/CharShop/index.vue';

export default {
  name: 'ControlCharacter',

  mixins: [Control],

  components: {
    ImgCharacter,
    ImgDecorations,
    ControlButtons,
    CharInventory,
    CharShop,
  },

  props: ['currentAct'],

  data() {
    return {
      screenWidth: window.innerWidth,

      DecorationAnimations,

      characters: [
        { name: 'archer', animations: ArcherAnimations },
        { name: 'wizard', animations: WizardAnimations },
        { name: 'swordsman', animations: SwordsmanAnimations },
        { name: 'skeleton', animations: SkeletonAnimations },
      ],

      keyPressed: 'idle',
      prevKeyPressed: 'idle',

      isFacingLeft: false,
      isJumping: false,

      positionX: 0,
      scrollInterval: null,

      attackInterval: null,
      attackCooldown: 500,

      arrows: [],
      arrowUpdateInterval: null,

      enemyPositionX: 1000,
      enemyId: null,

      player: {
        currentCharacter: {
          name: 'archer',
          animations: ArcherAnimations,
        },

        maxHealth: 1000,
        health: 1000,

        walkingSpeed: 6,
        runningSpeed: 15,

        money: {
          coins: {
            silver: 0,
            gold: 0,
            red: 0,
          },
          gems: {
            blue: 0,
            yellow: 0,
            green: 0,
            grey: 0,
            red: 0,
          },
        },

        attacks: {
          attack: { damage: 8 },
          attack2: { damage: 10 },
          attack3: { damage: 16 },
        },
      },
      showShop: false,
      showInventory: false,
    };
  },
  computed: {
    selectedImages() {
      switch (this.keyPressed) {
        case 'idle':
          return this.player.currentCharacter.animations.idle;
        case 'walk':
          return this.player.currentCharacter.animations.walk;
        case 'run':
          return this.player.currentCharacter.animations.run;
        case 'jump':
          return this.player.currentCharacter.animations.jump;
        case 'attack':
          return this.player.currentCharacter.animations.attack;
        case 'attack2':
          return this.player.currentCharacter.animations.attack2;
        case 'attack3':
          return this.player.currentCharacter.animations.attack3;
        case 'dead':
          return this.player.currentCharacter.animations.dead;
        default:
          return [];
      }
    },

    animationLen() {
      return this.player.currentCharacter.animations[this.keyPressed].length;
    },

    charDirection() {
      return {
        transform: this.isFacingLeft ? 'scale(-1, 1)' : 'none',
      };
    },

    healthPercentage() {
      return (this.player.health / this.player.maxHealth) * 100;
    },

    styleCharInAct() {
      return {
        bottom: this.currentAct === 'ActVI' ? '10%' : '25%',
      };
    },
  },

  mounted() {
    emitter.on('coin-collected', this.collectCoin);
    emitter.on('gem-collected', this.collectGem);
  },

  beforeUnmount() {
    emitter.off('coin-collected', this.collectCoin);
    emitter.off('gem-collected', this.collectGem);

    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  },

  methods: {
    switchCharacter() {
      const currentIndex = this.characters.findIndex(
        (character) => character.name === this.player.currentCharacter.name,
      );
      const nextIndex = (currentIndex + 1) % this.characters.length;
      this.player.currentCharacter = this.characters[nextIndex];
    },

    collectCoin({ currencyId }) {
      const currencyType = currencyId.split('-')[0];

      this.player.money.coins[currencyType] += 1;
    },

    collectGem({ currencyId }) {
      const currencyType = currencyId.split('-')[0];

      this.player.money.gems[currencyType] += 1;
    },

    showModalcloseOtherModal(modal) {
      if (modal === 'shop') {
        this.showShop = !this.showShop;
        this.showInventory = false;
      } else if (modal === 'inventory') {
        this.showInventory = !this.showInventory;
        this.showShop = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url('@/assets/char/hpbar/index.scss');
</style>
