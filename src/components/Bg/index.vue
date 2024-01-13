<template>
    <div class="game-container">
      <!-- may be I can use v-show? -->
      <ActComponent
        ref="act"
        v-if="Object.keys(actsData)[currentActIndex]"
        :key="currentActKey"
        :scenes="actsData[Object.keys(actsData)[currentActIndex]]"
      >

        <template v-slot:enemy>
          <EnemyCharacter
            v-for="(enemy, index) in getEnemiesForCurrentAct()"
            :key="`enemy-${index}`"
            :enemyId="enemy.enemyId"
            :initialCharacter="enemy.initialCharacter"
            :initialPositionX="enemy.initialPositionX"
            :initialHealth="enemy.initialHealth"
            :initialMaxHealth="enemy.initialMaxHealth"
            :initialAttack="enemy.initialAttack"
            :attackRange="enemy.attackRange"
          />
        </template>

        <template v-slot:character>
          <ControlCharacter
            :currentAct="getCurrentAct()"
          />
        </template>
      </ActComponent>

      <div class="ribbon">
        <span>
          {{ Object.keys(actsData)[currentActIndex] }}
        </span>
      </div>
    </div>
</template>

<script>
import emitter from '@/eventBus';
import actsData from './scenes';
import enemies from './enemies';
import ActComponent from './Act/index.vue';
import ControlCharacter from '../Char/ControlCharacter/index.vue';
import EnemyCharacter from '../Char/EnemyCharacter/index.vue';

export default {
  name: 'ActView',
  data() {
    return {
      currentActIndex: 0,
      currentActKey: 'act-ActI',
      actsData,
      enemies,
    };
  },
  components: {
    ActComponent,
    ControlCharacter,
    EnemyCharacter,
  },
  mounted() {
    emitter.on('prevAct', this.prevAct);
    emitter.on('nextAct', this.nextAct);
    emitter.on('update:position', this.updateCharacterPosition);
  },
  beforeUnmount() {
    emitter.off('prevAct', this.prevAct);
    emitter.off('nextAct', this.nextAct);
    emitter.off('update:position', this.updateCharacterPosition);
  },
  methods: {
    getCurrentAct() {
      return Object.keys(this.actsData)[this.currentActIndex];
    },

    getEnemiesForCurrentAct() {
      return this.enemies[this.getCurrentAct()] || [];
    },

    nextAct() {
      this.currentActIndex = (this.currentActIndex + 1) % Object.keys(this.actsData).length;
      this.currentActKey = `act-${Object.keys(this.actsData)[this.currentActIndex]}`;
      this.resetAct();
    },

    prevAct() {
      if (this.currentActIndex === 0) {
        this.currentActIndex = Object.keys(this.actsData).length - 1;
      } else {
        this.currentActIndex -= 1;
      }
      this.currentActKey = `act-${Object.keys(this.actsData)[this.currentActIndex]}`;
      this.resetAct();
    },

    updateCharacterPosition({ direction, speed }) {
      this.$refs.act.moveBackground(direction, speed);
    },
    resetAct() {
      this.$refs.act.resetBackgroundPosition();
    },
  },
};
</script>

<style lang="scss">
.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.cemetery-sky {
  display: flex;
  position: absolute;
  background-image: url('@/assets/bg/cemetery/sky.png');
  background-size: 101% auto;
  animation: slide 100s linear infinite;
}

.invisible-top {
  clip-path: inset(15% 0 0 0);
}

.background-layer {
  z-index: 5; /* Behind the character */
}

.foreground-layer {
  position: relative;
  z-index: 15; /* In front of the character */
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -27000% 0;
  }
}

/* 4 - фиолетовый */

.ribbon {
  position: absolute;
  top: -20px;
  right: 80px;
  filter: drop-shadow(12px 13px 12px rgba(0, 0, 0, 0.5));
}

.ribbon span {
  display: block;
  color: #fff;
  text-shadow: 8px 8px 8px black;
  font-size: 22px;
  text-align: center;
  background: #680202;
  width: 140px;
  line-height: 156px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
  border: 5px solid rgb(141, 5, 5);
}
</style>
