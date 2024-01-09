<template>
  <div class="enemy-health-bar-outer" :style="healthBarPosition">
    Enemy
    <div class="character-statistics">
      Pos X: {{ positionX }}
    </div>
    <div class="health-bar-inner" :style="{width: healthPercentage + '%'}">
      {{ healthPercentage }}%
    </div>
  </div>
  <ImgEnemyCharacter
    :images="enemyImages"
    :direction="enemyDirection"
    :jump="enemyJump"
    :position="positionX"
  />
</template>

<script>
import emitter from '@/eventBus';
import { ArcherAnimations } from '@/assets/char/ally/archer/ArcherAnimations';
import { SwordsmanAnimations } from '@/assets/char/ally/swordsman/SwordsmanAnimations';
import { WizardAnimations } from '@/assets/char/ally/wizard/WizardAnimations';
import { PaladinAnimations } from '@/assets/char/enemy/paladin/PaladinAnimations';
import { WarriorAnimations } from '@/assets/char/enemy/warrior/WarriorAnimations';
import { WarmorAnimations } from '@/assets/char/enemy/warmor/WarmorAnimations';
import ImgEnemyCharacter from './ImgEnemyCharacter/index.vue';

export default {
  name: 'EnemyCharacter',
  components: {
    ImgEnemyCharacter,
  },
  data() {
    return {
      currentCharacter: 'Warrior',
      enemyState: 'idle',
      enemyStateTime: 0,
      stateDuration: {
        idle: 1,
        walk: 5,
        run: 2,
        attack: 2,
      },
      direction: 1,
      maxHealth: 100,
      health: 100,
      positionX: 330,
      screenWidth: window.innerWidth,
      enemyInterval: null,
    };
  },
  computed: {
    enemyImages() {
      switch (this.currentCharacter) {
        case 'Warrior':
          return WarriorAnimations[this.enemyState];
        case 'Warmor':
          return WarmorAnimations[this.enemyState];
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
    /*
    enemyPosition() {
      return { x: this.positionX };
    },
    */
    healthPercentage() {
      return (this.health / this.maxHealth) * 100;
    },
    healthBarPosition() {
      return {
        left: `calc(${this.positionX}px + 150px)`, top: '40%',
      };
    },
  },
  methods: {
    switchCharacter() {
      const characters = ['Warrior', 'Warmor', 'Paladin', 'Archer', 'Swordsman', 'Wizard'];
      let currentIndex = characters.indexOf(this.currentCharacter);
      currentIndex = (currentIndex + 1) % characters.length;
      this.currentCharacter = characters[currentIndex];
    },
    moveEnemy(speed) {
      if (['walk', 'run'].includes(this.enemyState)) {
        const proposedX = this.positionX + (this.direction * speed);

        if (proposedX < 0 || proposedX > this.screenWidth - 300) {
          this.direction *= -1;
        } else {
          this.positionX = proposedX;
        }
        this.updateEnemyCharacterPosition();
      }
    },

    startMoveInterval() {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
      }
      const speed = this.enemyState === 'walk' ? 4 : 8;
      this.enemyInterval = setInterval(() => {
        this.moveEnemy(speed);
      }, 20);
    },

    updateEnemyCharacterPosition() {
      emitter.emit('update-enemy-position', this.positionX);
    },

    attack() {
      this.enemyState = 'attack';
      setTimeout(() => {
        if (this.enemyState === 'attack') {
          this.changeState('idle');
        }
      }, this.stateDuration.attack * 1000);
    },

    changeState(newState) {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
        this.enemyInterval = null;
      }
      this.enemyState = newState;
      this.enemyStateTime = 0;

      if (['walk', 'run'].includes(newState)) {
        this.startMoveInterval();
      }
    },

    nextState() {
      switch (this.enemyState) {
        case 'idle':
          this.changeState('walk');
          break;
        case 'walk':
          this.changeState('run');
          break;
        case 'run':
          this.changeState('attack');
          break;
        case 'attack':
          this.changeState('idle');
          break;
        default:
          this.changeState('idle');
          break;
      }
    },

    updateStateDuration() {
      this.enemyStateTime += 1;
      if (this.enemyStateTime >= this.stateDuration[this.enemyState]) {
        this.nextState();
      }
    },
  },

  created() {
    this.enemyStateInterval = setInterval(this.updateStateDuration, 1000);
  },

  mounted() {
    emitter.on('switch-enemy-character', this.switchCharacter);
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
  width: 200px; /* Fixed width or relative to character size */
  height: 10px;
  background-color: grey; /* Background color representing lost health */
  border: 1px solid black;
  z-index: 999;
  color: white;
}

.health-bar-inner {
  height: 100%;
  background-color: green; /* Foreground color representing current health */
}
</style>
