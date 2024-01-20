<template>
  <div class="health-bar-outer">
    <div class="health-bar-inner" :style="{width: healthPercentage + '%'}">
      <span>{{ health }}/{{ maxHealth }}</span>
    </div>
  </div>
  <ImgCharacter
    :key="currentCharacter"
    :images="selectedImages"
    :direction="charDirection"
    :styleChar="styleCharInAct"
    :state="keyPressed"
  />
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

  beforeUnmount() {
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
  },
};
</script>

<style lang="scss">
@import url('@/assets/char/hpbar/index.scss');
</style>
