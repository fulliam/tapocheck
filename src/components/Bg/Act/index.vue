<template>
  <div class="dev-info">{{ pageSize }}</div>

  <div class="act-container">
    <slot name="currencies" :scene="styledScene"></slot>
    <slot name="enemy" :scene="styledScene"></slot>
    <slot name="character" :scene="styledScene"></slot>

    <div
      v-for="(styledScene, index) in styledScenes"
      :key="`scene-container-${index}`"
      class="act-scene-container"
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
      pageSize: `${window.innerWidth}x${window.innerHeight}`,
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
    maxScrollPosition() {
      return -window.innerWidth * 3;
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

    updatePageSize() {
      this.pageSize = `${window.innerWidth}x${window.innerHeight}`;
      this.$forceUpdate();
    },

    resetBackgroundPosition() {
      this.backgroundPositionX = 0;
    },
  },

  mounted() {
    window.addEventListener('resize', this.updatePageSize);
  },

  beforeUnmount() { // Используйте beforeDestroy, если вы используете Vue 2
    window.removeEventListener('resize', this.updatePageSize);
  },
};
</script>

<style lang="scss">
$sceneCount: 4;

.act-container {
  display: flex;
  width: calc(100vw * #{$sceneCount});
  height: 100vh;
  overflow: hidden;
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
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  &.firefly-animation {
    animation: fadeInOut 3s ease-in-out infinite;
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
