<template>
  <ActView />

  <div class="context-menu__wrapper" @contextmenu.prevent="openContextMenu">
    <ContextMenu>
      <div class="act-params">
        <button @click="emitPrevActEvent">Prev Act</button>
        <button @click="emitNextActEvent">Next Act</button>
      </div>

      <div class="char-params">
        <button @click="switchCharacter">Switch Char</button>
        <div class="slider-container">
          <label for="walking-speed">Walking Speed: {{ walkingSpeed }}
            <input
              type="range"
              id="walking-speed"
              v-model.number="walkingSpeed"
              @input="updateWalkingSpeed"
              min="1" max="100" step="1"
            />
          </label>

          <label for="running-speed">Running Speed: {{ runningSpeed }}
            <input
              type="range"
              id="running-speed"
              v-model.number="runningSpeed"
              @input="updateRunningSpeed"
              min="1" max="200" step="1"
            />
          </label>
        </div>
      </div>
      <button @click="switchEnemyCharacter">Switch Enemy</button>
      <button @click="refreshEnemyHealth">🗘</button>
    </ContextMenu>
  </div>
</template>

<script>
import emitter from '@/eventBus';
import ActView from '../../components/Bg/index.vue';
import ContextMenu from '../../components/ContextMenu/index.vue';

export default {
  name: 'MainPage',
  components: {
    ActView,
    ContextMenu,
  },
  props: {
    initialWalkingSpeed: Number,
    initialRunningSpeed: Number,
  },
  data() {
    return {
      walkingSpeed: this.initialWalkingSpeed,
      runningSpeed: this.initialRunningSpeed,
    };
  },
  methods: {
    openContextMenu(event) {
      emitter.emit('open-context-menu', event);
    },
    emitPrevActEvent() {
      emitter.emit('prevAct');
    },
    emitNextActEvent() {
      emitter.emit('nextAct');
    },
    switchCharacter() {
      emitter.emit('switch-character');
    },
    switchEnemyCharacter() {
      emitter.emit('switch-enemy-character');
    },
    updateWalkingSpeed() {
      emitter.emit('update-walking-speed', this.walkingSpeed);
    },
    updateRunningSpeed() {
      emitter.emit('update-running-speed', this.runningSpeed);
    },
    refreshEnemyHealth() {
      emitter.emit('refresh-enemy-health');
    },
  },
};
</script>

<style lang="scss">
.context-menu__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  box-shadow: inset 0 0 100px black;
}

.act-params {
  position: relative;
  display: grid;
}

.char-params {
  & .slider-container {
    position: relative;
    display: grid;
    top: -48px;
    left: 30px;
    color: rgb(200, 180, 0);
    text-shadow: 3px 3px 3px black;
    width: 80%;
  }

  & button {
    position: relative;
    top: -70px;
    right: -80px;
    width: 120px;
    height: 60px;
  }

  & label {
    cursor: pointer;
  }

  & input[type="range"] {
    cursor: pointer;
  }
}
</style>
