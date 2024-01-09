<template>
    <div class="game-container">
      <ActComponent
        ref="act"
        v-if="Object.keys(actsData)[currentActIndex]"
        :key="currentActKey"
        :scenes="actsData[Object.keys(actsData)[currentActIndex]]"
      >
        <template v-slot:character>
          <ControlCharacter
            @update:position="updateCharacterPosition"
            :currentAct="getCurrentAct()"
          />
        </template>

        <template v-slot:enemy>
          <EnemyCharacter/>
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
import { BgParts } from '@/assets/bg/Backgrounds';
import ActComponent from './Act/index.vue';
import ControlCharacter from '../Char/ControlCharacter/index.vue';
import EnemyCharacter from '../Char/EnemyCharacter/index.vue';

export default {
  name: 'ActView',
  components: {
    ActComponent,
    ControlCharacter,
    EnemyCharacter,
  },
  mounted() {
    emitter.on('prevAct', this.prevAct);
    emitter.on('nextAct', this.nextAct);
  },
  beforeUnmount() { // or beforeDestroy for Vue 2
    emitter.off('prevAct', this.prevAct);
    emitter.off('nextAct', this.nextAct);
  },
  methods: {
    getCurrentAct() {
      return Object.keys(this.actsData)[this.currentActIndex];
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

    updateCharacterPosition(direction, speed) {
      this.$refs.act.moveBackground(direction, speed);
    },
    resetAct() {
      this.$refs.act.resetBackgroundPosition();
    },
  },
  data() {
    return {
      currentActIndex: 0,
      currentActKey: 'act-ActI',
      actsData: {
        ActI: [
          [ // Сцена 1
            { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
            { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
            { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
            { src: BgParts.forest.road, parallaxSpeed: 0.9 },
            { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
          ],
          [ // Сцена 2
            { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
            { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
            { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
            { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
            { src: BgParts.forest.road, parallaxSpeed: 0.9 },
            { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
          ],
          [ // Сцена 3
            { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
            { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
            { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
            { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
            { src: BgParts.forest.road, parallaxSpeed: 0.9 },
            { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
          ],
          [ // Сцена 4
            { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
            { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
            { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
            { src: BgParts.forest.road, parallaxSpeed: 0.9 },
            { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
            { src: BgParts.cemetery.tree, style: { position: 'relative', left: '-25%' }, parallaxSpeed: 0.9 },
            { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
            { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
            { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
          ],
        ],
        ActII: [
          [ // Сцена 1
            { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 2
            { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 3
            { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 4
            { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
            { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
          ],
        ],
        ActIII: [
          [ // Сцена 1
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
            { src: BgParts.forest.road, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 2
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.trees, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
            { src: BgParts.forest.road, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 3
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.ruin.trees, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
            { src: BgParts.forest.road, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 4
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.ruin.trees, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
            { src: BgParts.forest.road, parallaxSpeed: 0.8 },
            { src: BgParts.ruin.statue, style: { position: 'relative', top: '25%', left: '-40%' }, parallaxSpeed: 0.8 },
          ],
        ],
        ActIV: [
          [ // Сцена 1
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
            { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 2
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
            { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 3
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
            { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },

          ],
          [ // Сцена 4
            { class: 'cemetery-sky', parallaxSpeed: 0.2 },
            { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
            { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
            { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
            { src: BgParts.ruin.statue, style: { position: 'relative', top: '-175%', left: '-90%' }, parallaxSpeed: 0.8 },
          ],
        ],
        ActV: [
          [ // Сцена 1
            { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
            { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
            { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 2
            { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
            { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
            { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 3
            { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
            { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
            { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
            { src: BgParts.castle.candeliar, parallaxSpeed: 0.8 },
            { src: BgParts.castle.candeliar, style: { position: 'relative', top: '60%', left: '-30%' }, parallaxSpeed: 0.8 },
          ],
          [ // Сцена 4
            { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
            { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
            { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
            { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
            { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
            { src: BgParts.castle.candeliar, parallaxSpeed: 0.8 },
            { src: BgParts.castle.dragon, style: { position: 'relative', top: '27%' }, parallaxSpeed: 0.8 },
            { src: BgParts.castle.candeliar, style: { position: 'relative', top: '-40%', right: '20%' }, parallaxSpeed: 0.8 },
          ],
        ],
        ActVI: [
          [ // Сцена 1
            { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
            { src: BgParts.cave.cave6, parallaxSpeed: 0.2 },
            { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.3 },
            { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
            { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
            { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
            {
              src: BgParts.cave.cave1, parallaxSpeed: 0.7,
            },
            {
              src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
            },
            { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
          ],
          [ // Сцена 1
            { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
            { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.2 },
            { src: BgParts.cave.cave6, parallaxSpeed: 0.3 },
            { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
            { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
            { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
            {
              src: BgParts.cave.cave1, parallaxSpeed: 0.7,
            },
            {
              src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
            },
            { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
          ],
          [ // Сцена 1
            { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
            { src: BgParts.cave.cave6, parallaxSpeed: 0.2 },
            { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.3 },
            { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
            { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
            { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
            {
              src: BgParts.cave.cave1, parallaxSpeed: 0.7,
            },
            {
              src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
            },
            { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
          ],
          [ // Сцена 1
            { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
            { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.2 },
            { src: BgParts.cave.cave6, parallaxSpeed: 0.3 },
            { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
            { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
            { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
            {
              src: BgParts.cave.cave1, parallaxSpeed: 0.7,
            },
            {
              src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
            },
            { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
          ],
        ],
      },
    };
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
