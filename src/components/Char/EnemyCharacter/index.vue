<template>
  <div class="enemy-health-bar-outer" :style="healthBarPosition">
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
import { DemonAnimations } from '@/assets/char/boss/demon2/DemonAnimations';
import { DragonAnimations } from '@/assets/char/boss/dragon/DragonAnimations';
import ImgEnemyCharacter from './ImgEnemyCharacter/index.vue';

export default {
  name: 'EnemyCharacter',
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
      default: 230, // Значение по умолчанию, если не передано
    },
    // ... и так далее для всех ключевых переменных
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

    moveEnemy(speed) {
      if (['walk', 'run'].includes(this.enemyState)) {
        const proposedX = this.positionX + (this.direction * speed);

        let startX; let
          endX;
        if (this.direction < 0) {
          startX = this.positionX - 50;
          endX = this.positionX;
        } else {
          startX = this.positionX;
          endX = this.positionX + 50;
        }

        if (proposedX < startX) {
          this.positionX = startX;
          this.direction = 1;
        } else if (proposedX > endX) {
          this.positionX = endX;
          this.direction = -1;
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

    updatePositionIfPlayerMove({ direction, speed, playerPositionX }) {
      if (direction === 'right') {
        this.positionX -= speed;
      } else if (direction === 'left') {
        this.positionX += speed;
      }

      this.playerPositionX = playerPositionX;
    },

    installEnemyState() {
      const distanceToPlayer = this.positionX - this.playerPositionX;
      this.direction = distanceToPlayer > 0 ? -1 : 1;

      const now = Date.now();
      if (now < this.attackCooldown) {
        return;
      }

      if (this.currentCharacter === 'Demon' || this.currentCharacter === 'Dragon') {
        if (Math.abs(distanceToPlayer) <= this.attackRange) {
          this.attack();
          this.attackCooldown = now + this.attackCooldownDuration;
        } else if (Math.abs(distanceToPlayer) <= 900) {
          this.changeState('walk');
        } else {
          this.changeState('idle');
        }
      } else if (Math.abs(distanceToPlayer) <= 230) {
        if (this.lastAttack === 'attack2') {
          this.attack();
          this.lastAttack = 'attack';
        } else {
          this.attack2();
          this.lastAttack = 'attack2';
        }
        this.attackCooldown = now + this.attackCooldownDuration;
      } else if (Math.abs(distanceToPlayer) <= 900) {
        this.changeState('run');
      } else if (Math.abs(distanceToPlayer) <= 1600) {
        this.changeState('walk');
      } else {
        this.changeState('idle');
      }
    },

    attack() {
      this.enemyState = 'attack';
      setTimeout(() => {
        if (this.enemyState === 'attack') {
          emitter.emit('enemy-attack', { damage: 2, enemyId: this.enemyId });
        }
      }, 100);
    },

    attack2() {
      this.enemyState = 'attack2';
      setTimeout(() => {
        if (this.enemyState === 'attack2') {
          emitter.emit('enemy-attack', { damage: 2, enemyId: this.enemyId });
        }
      }, 100);
    },

    applyDamage({ damage, enemyId, direction }) {
      const isFacingEnemy = (this.direction === 1 && direction === 'left')
                        || (this.direction === -1 && direction === 'right');

      if (this.enemyId === enemyId && isFacingEnemy) {
        this.health -= damage;
        if (this.health <= 0) {
          clearInterval(this.enemyInterval);
          clearInterval(this.enemyStateInterval);
          this.enemyState = 'dead';
          this.health = 0;

          emitter.emit('enemy-dead', this.enemyId);
        }
      }
    },

    stopAndIdleEnemy() {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
        this.enemyInterval = null;
      }
      if (this.enemyStateInterval) {
        clearInterval(this.enemyStateInterval);
        this.enemyStateInterval = null;
      }
      this.enemyState = 'idle';
    },

    refreshEnemyHealth() {
      this.health = 100;
      this.enemyStateInterval = setInterval(this.installEnemyState, 100);
      emitter.emit('refresh-enemy', this.enemyId);
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
  },

  mounted() {
    emitter.on('switch-enemy-character', this.switchCharacter);
    emitter.on('update:position', this.updatePositionIfPlayerMove);
    emitter.on('character-attack', this.applyDamage);
    emitter.on('refresh-enemy-health', this.refreshEnemyHealth);
    emitter.on('character-dead', this.stopAndIdleEnemy);
    this.enemyStateInterval = setInterval(this.installEnemyState, 100);
  },

  beforeUnmount() {
    clearInterval(this.enemyInterval);
    clearInterval(this.enemyStateInterval);
    emitter.off('switch-enemy-character', this.switchCharacter);
    emitter.off('update:position', this.updatePositionIfPlayerMove);
    emitter.off('character-attack', this.applyDamage);
    emitter.off('refresh-enemy-health', this.refreshEnemyHealth);
    emitter.off('character-dead', this.stopAndIdleEnemy);
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
