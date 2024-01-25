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
            :currencyId="currency.currencyId"
            :positionX="currency.initialPositionX"
            :images="currency.images"
            :currentAct="getCurrentAct()"
            :type="currency.type"
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
            :initialAttacks="enemy.initialAttacks"
            :attackRange="enemy.attackRange"
            :currencyDrop="enemy.currencyDrop"
            :currentAct="getCurrentAct()"
          />
        </template>

        <template v-slot:character>
          <ControlCharacter
            :currentAct="getCurrentAct()"
          />
        </template>

        <template v-slot:decorations>

        </template>
      </ActComponent>
      <!--
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
      -->
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
      currentActIndex: 0,
      currentActKey: 'act-ActI',
      actsData,

      enemies,

      CurrenciesAnimations,
      currencies,
      currencyIdKey: 0,

      isLoading: true,
      deviceInfo: {},
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
    emitter.on('device-info', this.handleDeviceInfo);
    emitter.on('spawn-money', this.spawnCurrencyAfterEnemyDead);
    emitter.on('coin-collected', this.removeCollectedCurrency);
    emitter.on('gem-collected', this.removeCollectedCurrency);
  },

  beforeUnmount() {
    emitter.off('prevAct', this.prevAct);
    emitter.off('nextAct', this.nextAct);
    emitter.off('update:position', this.updateCharacterPosition);
    emitter.off('device-info', this.handleDeviceInfo);
    emitter.off('spawn-money', this.spawnCurrencyAfterEnemyDead);
    emitter.off('coin-collected', this.removeCollectedCurrency);
    emitter.off('gem-collected', this.removeCollectedCurrency);
  },

  methods: {
    spawnCurrencyAfterEnemyDead({ positionX, money }) {
      money.forEach((drop) => {
        const amount = Math.floor(Math.random() * drop.amount) + 1;

        for (let i = 0; i < amount; i += 1) {
          const offset = Math.random() * 100 - 50;
          const initialPositionX = (this.deviceInfo.device !== 'Десктопный компьютер' ? positionX - 80 : positionX) + offset;
          const newCurrency = {
            currencyId: `${drop.currencyId}-${this.currencyIdCounter}`,
            images: this.CurrenciesAnimations[drop.type][drop.currencyId],
            initialPositionX,
            type: drop.type,
          };
          this.currencies[this.getCurrentAct()].push(newCurrency);
          this.currencyIdCounter += 1;
        }
      });
    },

    removeCollectedCurrency({ currencyId }) {
      this.currencies[this.getCurrentAct()] = this.currencies[this.getCurrentAct()].filter(
        (currency) => currency.currencyId !== currencyId,
      );
    },

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
      let enemiesForCurrentAct = this.enemies[this.getCurrentAct()];
      if (this.deviceInfo.device !== 'Десктопный компьютер') {
        enemiesForCurrentAct = enemiesForCurrentAct.map((enemy) => ({
          ...enemy,
          attackRange: enemy.attackRange / 2,
        }));
      }
      return enemiesForCurrentAct;
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

    handleDeviceInfo({
      browser, device, os, referrer,
    }) {
      this.deviceInfo = {
        browser,
        device,
        os,
        referrer,
      };
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
  right: 52%;
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
