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
    :style="{ filter: enemyIsDead ? 'drop-shadow(0px 0px 4px blueviolet)' : 'none',
              zIndex: enemyIsDead ? '1020' : 'none',
            }"
    @click="toggleEnemyInventory"
    @keydown.q="toggleEnemyInventory"
    @touch="toggleEnemyInventory"
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

import ImgEnemyCharacter from './ImgEnemyCharacter/index.vue';
import behavior from './behavior';
import EnemyInventory from './EnemyInventory/index.vue';

export default {
  name: 'EnemyCharacter',

  mixins: [behavior],

  components: {
    ImgEnemyCharacter,
    EnemyInventory,
  },

  props: {
    enemyId: {
      type: String,
      required: true,
    },
    initialCharacter: {
      type: String,
      default: 'Warrior',
    },
    initialPositionX: {
      type: Number,
      default: 600,
    },
    initialHealth: {
      type: Number,
      default: 100,
    },
    initialMaxHealth: {
      type: Number,
      default: 100,
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
      default: 230,
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
    };
  },

  computed: {
    enemyImages() {
      switch (this.currentCharacter) {
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
      if (this.currentCharacter === 'Spirit') {
        return {
          left: `calc(${this.positionX}px + 200px)`,
          top: this.currentAct !== 'ActVI' ? '42%' : '67%',
        };
      }
      return {
        left: `calc(${this.positionX}px + 200px)`,
        top: this.currentAct !== 'ActVI' ? '42%' : '62%',
      };
    },

    styleEnemyInAct() {
      if (this.currentCharacter === 'Spirit') {
        return {
          bottom: this.currentAct !== 'ActVI' ? '15%' : '0%',
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
      const characters = ['Spirit', 'Warmor', 'Warrior', 'Paladin'];
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
