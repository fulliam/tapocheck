<template>
  <div
    class="damage-indicator"
    :style="{ top: position + '%',
              opacity: opacity,
              left: positionX + 'px',
              color: color,
            }">
    -{{ damage }}
  </div>
</template>

<script>
export default {
  name: 'DamageIndicator',

  props: {
    damage: {
      type: Number,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      position: 55,
      opacity: 1,
    };
  },

  mounted() {
    this.startAnimation();
  },

  methods: {
    startAnimation() {
      const interval = setInterval(() => {
        this.position -= 0.5;
        this.opacity -= 0.01;
        if (this.opacity <= 0 || this.position <= 25) {
          this.opacity = 0;
          clearInterval(interval);
          this.$emit('animation-end');
        }
      }, 10);
    },
  },
};
</script>

<style scoped>
.damage-indicator {
  position: absolute;
  z-index: 999;
  font-weight: bold;
  font-size: 20px;
  text-shadow: 0px 0px 10px rgba(237, 217, 0, 0.912);
}
</style>
