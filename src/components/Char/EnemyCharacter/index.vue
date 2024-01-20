<template>
  <div class="enemy-health-bar-outer" :style="healthBarPosition">
    <div class="enemy-health-bar-inner" :style="{width: healthPercentage + '%'}">
      {{  parseInt(healthPercentage)  }}%
      {{ playerPositionX }}
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
  />
</template>

<script>
import { ArcherAnimations } from '@/assets/char/ally/archer/ArcherAnimations';
import { SwordsmanAnimations } from '@/assets/char/ally/swordsman/SwordsmanAnimations';
import { WizardAnimations } from '@/assets/char/ally/wizard/WizardAnimations';
import { PaladinAnimations } from '@/assets/char/enemy/paladin/PaladinAnimations';
import { WarriorAnimations } from '@/assets/char/enemy/warrior/WarriorAnimations';
import { WarmorAnimations } from '@/assets/char/enemy/warmor/WarmorAnimations';
import { DemonAnimations } from '@/assets/char/boss/demon2/DemonAnimations';
import { DragonAnimations } from '@/assets/char/boss/dragon/DragonAnimations';
import ImgEnemyCharacter from './ImgEnemyCharacter/index.vue';
import behavior from './behavior';

export default {
  name: 'EnemyCharacter',

  mixins: [behavior],

  components: {
    ImgEnemyCharacter,
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
    initialAttack: {
      type: Number,
      default: 1,
    },
    currentAct: {
      type: String,
      default: 'ActI',
    },
    attackRange: {
      type: Number,
      default: 230,
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

      attackCooldown: 0,
      attackCooldownDuration: 400,
      lastAttack: 'attack2',
    };
  },

  computed: {
    enemyImages() {
      switch (this.currentCharacter) {
        case 'Dragon':
          return DragonAnimations[this.enemyState];
        case 'Demon':
          return DemonAnimations[this.enemyState];
        case 'Warmor':
          return WarmorAnimations[this.enemyState];
        case 'Warrior':
          return WarriorAnimations[this.enemyState];
        case 'Paladin':
          return PaladinAnimations[this.enemyState];
        case 'Archer':
          return ArcherAnimations[this.enemyState];
        case 'Swordsman':
          return SwordsmanAnimations[this.enemyState];
        case 'Wizard':
          return WizardAnimations[this.enemyState];
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
        left: `calc(${this.positionX}px + 200px)`,
      };
    },

    styleEnemyInAct() {
      if (this.currentCharacter === 'Demon' || this.currentCharacter === 'Dragon') {
        return {
          height: '100%',
          bottom: this.currentAct === 'ActVI' ? '-18%' : '0%',
        };
      }
      return {
        bottom: this.currentAct === 'ActVI' ? '10%' : '25%',
      };
    },

    enemyAnimationSpeed() {
      if (this.currentCharacter === 'Dragon' || this.currentCharacter === 'Demon') {
        return 190;
      }
      return 100;
    },
  },

  methods: {
    switchCharacter() {
      const characters = ['Dragon', 'Demon', 'Warmor', 'Warrior', 'Paladin', 'Archer', 'Swordsman', 'Wizard'];
      let currentIndex = characters.indexOf(this.currentCharacter);
      currentIndex = (currentIndex + 1) % characters.length;
      this.currentCharacter = characters[currentIndex];
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
  bottom: 15%;
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
