<template>
  <div class="enemy-health-bar-outer" :style="healthBarPosition" v-if="health > 0">
    <div class="enemy-health-bar-inner" :style="{width: healthPercentage + '%'}">
      {{  parseInt(healthPercentage)  }}%
    </div>
  </div>

  <ImgEnemyCharacter
    :images="enemyImages"
    :direction="enemyDirection"
    :jump="enemyJump"
    :positionX="positionX"
    :styleEnemy="styleEnemyInAct"
    :state="enemyState"
    :animationSpeed="enemyAnimationSpeed"
    :enemyId="enemyId"
    :style="{ filter: enemyIsDead ? 'drop-shadow(0px 0px 4px #ccc)' : 'none',
              zIndex: enemyIsDead ? '1020' : 'none',
            }"
    @click="toggleEnemyInventory"
    @keydown.q="toggleEnemyInventory"
    @touch="toggleEnemyInventory"
  />

  <DamageIndicator
    v-for="(indicate, index) in damageIndicators"
    :key="index"
    :damage="indicate.damage"
    :positionX="positionX"
    :color="indicate.isCrit ? 'white' : 'orange'"
    @animation-end="removeDamageIndicator(index)"
  />

  <EnemyInventory
    ref="enemyInventory"
    :enemyIsDead="enemyIsDead"
    :positionX="positionX"
  />
</template>

<script>
import { SpiritAnimations } from '@/assets/char/enemy/spirit/SpiritAnimations';
import { PaladinAnimations } from '@/assets/char/enemy/paladin/PaladinAnimations';
import { WarriorAnimations } from '@/assets/char/enemy/warrior/WarriorAnimations';
import { WarmorAnimations } from '@/assets/char/enemy/warmor/WarmorAnimations';

import { orcWarriorAnimations } from '@/assets/char/enemy/orcs/warrior/OrcWarriorAnimations';
import { orcShamanAnimations } from '@/assets/char/enemy/orcs/shaman/OrcShamanAnimations';
import { orcBerserkAnimations } from '@/assets/char/enemy/orcs/berserk/OrcBerserkAnimations';

import { blueSlimeAnimations } from '@/assets/char/enemy/slimes/blue/BlueSlimeAnimations';
import { greenSlimeAnimations } from '@/assets/char/enemy/slimes/green/GreenSlimeAnimations';
import { redSlimeAnimations } from '@/assets/char/enemy/slimes/red/RedSlimeAnimations';

import ImgEnemyCharacter from './ImgEnemyCharacter/index.vue';
import behavior from './behavior';
import EnemyInventory from './EnemyInventory/index.vue';
import DamageIndicator from '../DamageIndicaor/index.vue';

export default {
  name: 'EnemyCharacter',

  mixins: [behavior],

  components: {
    ImgEnemyCharacter,
    EnemyInventory,
    DamageIndicator,
  },

  props: {
    enemyId: {
      type: String,
      required: true,
    },
    initialCharacter: {
      type: String,
    },
    initialPositionX: {
      type: Number,
    },
    initialHealth: {
      type: Number,
    },
    initialMaxHealth: {
      type: Number,
    },
    initialAttacks: {
      type: Array,
    },
    currentAct: {
      type: String,
      default: 'ActI',
    },
    attackRange: {
      type: Number,
    },
    currencyDrop: {
      type: Array,
    },
  },

  data() {
    return {
      currentCharacter: this.initialCharacter,
      enemyState: 'idle',
      enemyStateTime: 0,
      enemyInterval: null,

      health: this.initialHealth,
      maxHealth: this.initialMaxHealth,

      direction: 0,
      positionX: this.initialPositionX,
      playerPositionX: 0,
      screenWidth: window.innerWidth,

      attacks: this.initialAttacks,
      attackCooldown: 0,
      attackCooldownDuration: 400,
      lastAttack: 'attack2',

      money: this.currencyDrop,
      checkEnemyInventory: false,
      damageIndicators: [],
    };
  },

  computed: {
    enemyImages() {
      switch (this.currentCharacter) {
        case 'blueSlime':
          return blueSlimeAnimations[this.enemyState];
        case 'greenSlime':
          return greenSlimeAnimations[this.enemyState];
        case 'redSlime':
          return redSlimeAnimations[this.enemyState];
        case 'orcWarrior':
          return orcWarriorAnimations[this.enemyState];
        case 'orcShaman':
          return orcShamanAnimations[this.enemyState];
        case 'orcBerserk':
          return orcBerserkAnimations[this.enemyState];
        case 'Spirit':
          return SpiritAnimations[this.enemyState];
        case 'Warmor':
          return WarmorAnimations[this.enemyState];
        case 'Warrior':
          return WarriorAnimations[this.enemyState];
        case 'Paladin':
          return PaladinAnimations[this.enemyState];
        default:
          return WarriorAnimations[this.enemyState];
      }
    },

    enemyDirection() {
      return this.direction === 1 ? {} : { transform: 'scale(-1, 1)' };
    },

    enemyJump() {
      return {};
    },

    healthPercentage() {
      return (this.health / this.maxHealth) * 100;
    },

    healthBarPosition() {
      return {
        left: `calc(${this.positionX}px + 15%)`,
        top: this.currentAct !== 'ActVI' ? '42%' : '62%',
      };
    },

    styleEnemyInAct() {
      if (this.currentCharacter === 'Spirit') {
        return {
          bottom: this.currentAct !== 'ActVI' ? '30%' : '15%',
          height: '30%',
        };
      }
      if (this.currentCharacter.includes('orc')) {
        return {
          bottom: this.currentAct !== 'ActVI' ? '25%' : '10%',
          height: '40%',
        };
      }
      return {
        bottom: this.currentAct !== 'ActVI' ? '25%' : '10%',
      };
    },

    enemyAnimationSpeed() {
      if (this.currentCharacter === 'Spirit') {
        return 80;
      }
      return 100;
    },

    animationLen() {
      return this.enemyImages.length;
    },

    enemyIsDead() {
      const distanceToPlayer = Math.abs(this.positionX - this.playerPositionX);
      return this.enemyState === 'dead' && distanceToPlayer <= 150;
    },
  },

  methods: {
    switchCharacter() {
      const characters = ['blueSlime', 'greenSlime', 'redSlime', 'orcWarrior', 'orcShaman', 'orcBerserk', 'Spirit', 'Warmor', 'Warrior', 'Paladin'];
      let currentIndex = characters.indexOf(this.currentCharacter);
      currentIndex = (currentIndex + 1) % characters.length;
      this.currentCharacter = characters[currentIndex];
    },

    toggleEnemyInventory() {
      if (this.enemyIsDead) {
        this.$refs.enemyInventory.toggleInventory();
      }
    },
  },

  beforeUnmount() {
    clearInterval(this.enemyInterval);
    clearInterval(this.enemyStateInterval);
  },
};
</script>

<style lang="scss">
.enemy-health-bar-outer {
  position: absolute;
  width: 90px;
  height: 18px;
  background-color: rgba(34, 7, 7, 0.444);
  border: 3px solid black;
  border-radius: 7px;
  z-index: 99;
  color: white;
}

.enemy-health-bar-inner {
  height: 100%;
  border-radius: 3px;
  background-color: rgb(192, 44, 3);
}
</style>
