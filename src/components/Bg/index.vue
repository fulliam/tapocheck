<template>
    <div class="game-container">
      <ActComponent
        ref="act"
        v-show="Object.keys(actsData)[currentActIndex]"
        :key="currentActKey"
        :scenes="actsData[Object.keys(actsData)[currentActIndex]]"
      >
        <template v-slot:currencies>
          <ImgCurrencies
            v-for="(currency, index) in getCurrenciesForCurrentAct()"
            :key="`currency-${index}`"
            :currencyId="`${currency.currencyId}-${index}`"
            :positionX="currency.initialPositionX"
            :images="currency.images"
            :currentAct="getCurrentAct()"
            :value="currency.value"
          />
        </template>

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

      <div
        class="loading-overlay"
        v-if="isLoading"
      >
        <div class="ribbon">
          <span>
            {{ Object.keys(actsData)[currentActIndex] }}
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/eventBus';
import { CurrenciesAnimations } from '@/assets/currencies/CurrenciesAnimations';
import actsData from './scenes';
import enemies from './enemies';
import currencies from './currencies';
import ActComponent from './Act/index.vue';
import ControlCharacter from '../Char/ControlCharacter/index.vue';
import EnemyCharacter from '../Char/EnemyCharacter/index.vue';
import ImgCurrencies from '../Currencies/index.vue';

export default {
  name: 'ActView',
  data() {
    return {
      CurrenciesAnimations,
      currentActIndex: 0,
      currentActKey: 'act-ActI',
      actsData,
      enemies,
      currencies,
      isLoading: true,
    };
  },
  components: {
    ActComponent,
    ControlCharacter,
    EnemyCharacter,
    ImgCurrencies,
  },
  mounted() {
    this.setLoadingState();
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
    setLoadingState() {
      setTimeout(() => {
        this.isLoading = false;
        const loadingOverlay = document.getElementsByClassName('loading-overlay')[0];
        if (loadingOverlay) {
          loadingOverlay.style.display = 'none';
        }
      }, 9000);
    },

    getCurrentAct() {
      return Object.keys(this.actsData)[this.currentActIndex];
    },

    getEnemiesForCurrentAct() {
      return this.enemies[this.getCurrentAct()] || [];
    },

    getCurrenciesForCurrentAct() {
      return this.currencies[this.getCurrentAct()] || [];
    },

    nextAct() {
      this.currentActIndex = (this.currentActIndex + 1) % Object.keys(this.actsData).length;
      this.currentActKey = `act-${Object.keys(this.actsData)[this.currentActIndex]}`;
      this.resetAct();
      this.isLoading = true;
      this.setLoadingState();
    },

    prevAct() {
      if (this.currentActIndex === 0) {
        this.currentActIndex = Object.keys(this.actsData).length - 1;
      } else {
        this.currentActIndex -= 1;
      }
      this.currentActKey = `act-${Object.keys(this.actsData)[this.currentActIndex]}`;
      this.resetAct();
      this.isLoading = true;
      this.setLoadingState();
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

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -27000% 0;
  }
}

.ribbon {
  position: absolute;
  top: -20px;
  right: 55%;
  filter: drop-shadow(12px 13px 12px rgba(0, 0, 0, 0.5));
  opacity: 1;
  z-index: 9999;
  animation: fadeOut 12s forwards;
}

.ribbon span {
  display: block;
  color: #fff;
  text-shadow: 8px 8px 8px black;
  font-size: 22px;
  text-align: center;
  background: #680202;
  width: 330%;
  line-height: 256px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
  border: 5px solid rgb(141, 5, 5);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  opacity: 1;
  z-index: 9998;
  animation: fadeOut 15s forwards;
}

@keyframes fadeOut{
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
}
</style>
