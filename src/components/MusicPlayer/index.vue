<template>
  <div class="player">
    <!--
    <button
      @click="playMusic"
      class="player play pixel-border"
      style="--pixel-bg: #00b389"
    >
      <span class="triangle"></span>
    </button>
    -->
    <div class="player info">
      <p>Now playing: {{ musicList[currentSongIndex] }}</p>
      <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -->
      <audio
        ref="audioPlayer"
        @ended="endMusic"
        :src="`/music/${musicList[currentSongIndex]}`"
      >
      </audio>

      <h2>Track list:</h2>
      <ul>
        <li v-for="track in musicList" :key="track">
          {{ track }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'MusicPlayer',
  created() {
    emitter.on('update:volume', this.updateVolume);
    emitter.on('mute', this.handleMute);
  },
  data() {
    return {
      musicList: ['bg1.mp3'],
      currentSongIndex: 0,
      volume: 50,
    };
  },
  mounted() {
    this.$refs.audioPlayer.addEventListener('ended', this.endMusic);
  },
  beforeUnmount() {
    this.$refs.audioPlayer.removeEventListener('ended', this.endMusic);
    emitter.off('update:volume', this.updateVolume);
    emitter.off('mute', this.handleMute);
  },
  /* eslint-disable */
  watch: {
    volume(newValue) {
      this.adjustVolume();
    },
  },
  /* eslint-enable */
  methods: {
    playMusic() {
      const { audioPlayer } = this.$refs;
      audioPlayer.src = `/music/${this.musicList[this.currentSongIndex]}`;
      audioPlayer.removeEventListener('loadeddata', this.handleLoadedData);
      audioPlayer.addEventListener('loadeddata', this.handleLoadedData);
      audioPlayer.volume = this.volume / 100;
    },
    handleLoadedData() {
      const { audioPlayer } = this.$refs;
      audioPlayer.play();
    },
    endMusic() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.musicList.length;
      this.playMusic();
    },
    updateVolume(newVolume) {
      if (!this.muted) {
        this.volume = newVolume;
        this.adjustVolume();
      }
    },
    adjustVolume() {
      const { audioPlayer } = this.$refs;
      audioPlayer.volume = this.volume / 100;
    },
    handleMute(mutedStatus) {
      this.muted = mutedStatus;
      if (this.muted) {
        this.$refs.audioPlayer.volume = 0;
      } else {
        this.adjustVolume();
      }
    },
  },
  computed: {
    currentSong() {
      return this.musicList[this.currentSongIndex];
    },
  },
};
</script>

<style lang="scss">
.player {
  margin: 10px;
  padding: 10px;
  width: 390px;

  & .play {
    cursor: pointer;
    background-color: #00b389;
    border: none;
    color: rgb(209, 185, 6);
    height: 15px;
    width: 40px;
    display: block;

    & .triangle {
      position: relative;
      top: -10px;
      left: -4px;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid #d74f6a;

      &:before {
        content: '';
        position: absolute;
        top: -3px;
        left: -2px;
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-bottom: 14px solid transparent;
        border-left: 16px solid #d1b906;
      }
    }

    &:hover {
      & .triangle {
        border-left-color: #d1b906;
      }
      & .triangle:before {
        border-left-color: #d74f6a;
      }
    }
  }

  &.info {
    position: relative;
    top: -60px;
    width: 200px;
    left: 100px;

    & h2 {
      white-space: nowrap;
    }

    & ul {
      list-style: none;
      height: 100%;
      justify-content: end;
      display: grid;
      overflow: scroll;
      padding: 10px;
    }
  }
}
</style>
