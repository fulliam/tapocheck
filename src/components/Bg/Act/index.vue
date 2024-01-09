<template>
  <div class="act-container">
    <slot name="character" :scene="styledScene"></slot>
    <slot name="enemy" :scene="styledScene"></slot>

    <div
      v-for="(styledScene, index) in styledScenes"
      :key="`scene-container-${index}`"
      class="act-scene-container"
      :style="{ width: '100vw', transform: `translateX(${index * (sceneGap)}vw)` }"
    >
      <slot :index="index">
        <div
          v-for="(styledPart, i) in styledScene"
          :key="`part-${index}-${i}`"
          :class="['bg-part', styledPart.class]"
          :style="styledPart.style"
        >
          <img :src="styledPart.src" :alt="styledPart.alt || ' '"/>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActComponent',

  data() {
    return {
      backgroundPositionX: 0,
    };
  },

  props: {
    scenes: {
      type: Array,
      default: () => [],
    },
    sceneCount: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    scenes: {
      immediate: true,
      handler(newScenes, oldScenes) {
        if (newScenes !== oldScenes) {
          this.resetBackgroundPosition();
        }
      },
    },
  },

  computed: {
    sceneGap() {
      return 0;
    },
    maxScrollPosition() {
      return -5300;
    },
    styledScenes() {
      return this.scenes.map((scene) => scene.map((part) => {
        const newStyle = { ...part.style };
        newStyle.transform = `translateX(${this.backgroundPositionX * part.parallaxSpeed}px)`;
        return {
          ...part,
          style: newStyle,
        };
      }));
    },
  },

  methods: {
    moveBackground(direction, speed) {
      if (direction === 'right') {
        this.backgroundPositionX = Math.max(
          this.backgroundPositionX - speed,
          this.maxScrollPosition,
        );
      } else if (direction === 'left') {
        this.backgroundPositionX = Math.min(
          this.backgroundPositionX + speed,
          0,
        );
      }
    },

    vwToPixels(vw) {
      return ((document.documentElement.clientWidth * vw) / 100);
    },

    resetBackgroundPosition() {
      this.backgroundPositionX = 0;
    },
  },
};
</script>

<style lang="scss">
$sceneCount: 4;

.act-container {
  display: flex;
  width: calc(100vw * #{$sceneCount});
  height: 100%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .act-container {
    width: calc(100vw * #{$sceneCount});
  }
}

@media (max-width: 480px) {
  .act-container {
    width: calc(100vw * #{$sceneCount});
  }
}

.act-scene-container {
  flex: 0 0 auto;
  width: 100vw;
  height: 100%;
  position: relative;
}

.bg-part {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;

  & img {
    width: 100%;
    height: 100%;
  }

  &.firefly-animation {
    animation: fadeInOut 3s ease-in-out infinite;
  }

  &.background-layer {
    z-index: 5; /* Behind the character */
  }

  &.foreground-layer {
    position: relative;
    z-index: 15; /* In front of the character */
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
