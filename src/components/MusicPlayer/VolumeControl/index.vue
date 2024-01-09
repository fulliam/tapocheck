<template>
  <div class="music volume mute">
    <span>MUTE:&nbsp;</span>
    <label for="volume-mute">
      <input
        id="volume-mute"
        type="checkbox"
        @change="toggleMute"
      >
      <span class="mute-icon" v-show="muted" style="right: 8px;">🔇</span>
      <span class="mute-icon" v-show="!muted">🔊</span>
    </label>
  </div>

  <div class="music volume control">
    <span>volume: {{ currentVolume }}</span>
    <label for="volume-control">
      <input
        id="volume-control"
        type="range"
        min="0" max="100"
        :value="currentVolume"
        @input="volumeChanged"
      >
    </label>
  </div>
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'VolumeControl',
  props: {
    initialVolume: {
      type: Number,
      required: false,
      default: 50,
    },
  },
  data() {
    return {
      currentVolume: this.initialVolume,
      muted: false,
    };
  },
  methods: {
    volumeChanged(event) {
      if (!this.muted) {
        this.currentVolume = event.target.value;
        emitter.emit('update:volume', this.currentVolume);
      }
    },
    toggleMute() {
      this.muted = !this.muted;
      this.$emit('mute', this.muted);
      if (this.muted) {
        emitter.emit('update:volume', 0);
      } else {
        emitter.emit('update:volume', this.currentVolume);
      }
    },
  },
};
</script>

<style lang="scss">
@import url('@/assets/styles/Settings/SettingsMenu/VolumeControl/index.scss');

@mixin step1( $width, $color ) {
  box-shadow:
    $width 0 $color,
    -$width 0 $color,
    0 (-$width) $color,
    0 $width $color;
  margin: $width auto;
}

#volume-mute {
  @include step1( 2px, black );
}

@mixin step2v2( $width, $color, $bgcolor ) {
  box-shadow:
    $width 0 $bgcolor,
    -$width 0 $bgcolor,
    0 (-$width) $bgcolor,
    0 $width $bgcolor,
    2*$width 0 $color,
    -2*$width 0 $color,
    0 (-2*$width) $color,
    0 2*$width $color,
    0 0 0 $width $color;
}

#volume-control {
  @include step2v2( 2px, rgb(0, 0, 0), rgb(210, 175, 0) );
}

#volume-control::-webkit-slider-thumb,
#volume-control::-moz-range-thumb {
  @include step2v2( 4px, rgb(0, 0, 0), rgb(210, 175, 0) );
}
</style>
