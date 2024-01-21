<template>
  <div class="health-bar-outer">
    <div class="health-bar-inner" :style="{width: healthPercentage + '%'}">
      <span>{{ health }}/{{ maxHealth }}</span>
    </div>
  </div>

  <div class="coin-display">
    <div class="coin-item" v-for="(value, key) in money.coins" :key="key">
      <img :src="getCoinImage(key)" alt=" " />
      <span>{{ value }}</span>
    </div>
  </div>

  <div class="gem-display">
    <div class="gem-item" v-for="(value, key) in money.gems" :key="key">
      <img :src="getGemImage(key)" alt=" " />
      <span>{{ value }}</span>
    </div>
  </div>

  <ImgCharacter
    :key="currentCharacter"
    :images="selectedImages"
    :direction="charDirection"
    :styleChar="styleCharInAct"
    :state="keyPressed"
  />

  <!-- ImgDecorations is run animation -->
  <ImgDecorations
    :isActive="keyPressed === 'run'? true : false"
    :images="DecorationAnimations.effect.runSmoke"
    :styleDecoration="styleCharInAct"
    :charPosition="positionX"
    :direction="isFacingLeft"
  />

  <ControlButtons />
</template>

<script>
import emitter from '@/eventBus';

import { ArcherAnimations } from '@/assets/char/ally/archer/ArcherAnimations';
import { SwordsmanAnimations } from '@/assets/char/ally/swordsman/SwordsmanAnimations';
import { WizardAnimations } from '@/assets/char/ally/wizard/WizardAnimations';
import { SkeletonAnimations } from '@/assets/char/ally/skeleton/SkeletonAnimations';

import { PaladinAnimations } from '@/assets/char/enemy/paladin/PaladinAnimations';
import { WarriorAnimations } from '@/assets/char/enemy/warrior/WarriorAnimations';

import { DecorationAnimations } from '@/assets/decorations/DecorationAnimations';

import ImgDecorations from '@/components/Decorations/ImgDecorations/index.vue';
import ImgCharacter from './ImgCharacter/index.vue';

import Control from './control';
import ControlButtons from './ControlButtons/index.vue';

export default {
  name: 'ControlCharacter',

  mixins: [Control],

  components: {
    ImgCharacter,
    ImgDecorations,
    ControlButtons,
  },

  props: ['currentAct'],

  data() {
    return {
      screenWidth: window.innerWidth,

      scrollInterval: null,
      DecorationAnimations,
      currentCharacter: WizardAnimations,
      characters: [
        ArcherAnimations,
        WizardAnimations,
        SwordsmanAnimations,
        PaladinAnimations,
        WarriorAnimations,
        SkeletonAnimations,
      ],
      keyPressed: 'idle',
      prevKeyPressed: 'idle',
      isFacingLeft: false,
      isJumping: false,

      walkingSpeed: 6,
      runningSpeed: 15,

      maxHealth: 1000,
      health: 1000,
      positionX: 0,

      attacks: {
        attack: { damage: 8 },
        attack2: { damage: 10 },
        attack3: { damage: 16 },
      },
      attackInterval: null,
      attackCooldown: 500,

      enemyId: null,
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
    };
  },
  computed: {
    selectedImages() {
      switch (this.keyPressed) {
        case 'idle':
          return this.currentCharacter.idle;
        case 'walk':
          return this.currentCharacter.walk;
        case 'run':
          return this.currentCharacter.run;
        case 'jump':
          return this.currentCharacter.jump;
        case 'attack':
          return this.currentCharacter.attack;
        case 'attack2':
          return this.currentCharacter.attack2;
        case 'attack3':
          return this.currentCharacter.attack3;
        case 'dead':
          return this.currentCharacter.dead;
        default:
          return [];
      }
    },

    animationLen() {
      return this.currentCharacter[this.keyPressed].length;
    },

    charDirection() {
      return {
        transform: this.isFacingLeft ? 'scale(-1, 1)' : 'none',
      };
    },

    healthPercentage() {
      return (this.health / this.maxHealth) * 100;
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
      const currentIndex = this.characters.indexOf(this.currentCharacter);
      const nextIndex = (currentIndex + 1) % this.characters.length;
      this.currentCharacter = this.characters[nextIndex];
    },

    /* eslint-disable */
    getCoinImage(key) {
      return require(`@/assets/currencies/coins/${key}/${key}Coin1.png`);
    },

    getGemImage(key) {
      return require(`@/assets/currencies/gems/${key}/${key}Gem1.png`);
    },
    /* eslint-enable */

    collectCoin({ currencyId }) {
      const currencyType = currencyId.split('-')[0];

      this.money.coins[currencyType] += 1;
    },

    collectGem({ currencyId }) {
      const currencyType = currencyId.split('-')[0];

      this.money.gems[currencyType] += 1;
    },
  },
};
</script>

<style lang="scss">
@import url('@/assets/char/hpbar/index.scss');

.gem-display,
.coin-display {
  position: absolute;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px;
  border-radius: 5px;
  z-index: 1012;
  border: 2px solid #000;
}

.coin-display {
  top: 3%;
}

.gem-display {
  top: 20%;
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
  filter: drop-shadow(0 0 0.75rem rgb(200, 180, 0));
}
</style>
