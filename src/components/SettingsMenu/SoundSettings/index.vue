<template>
    <div class="setting">
        <div class="setting music">
            <h2>MUSIC</h2>
            <VolumeControl />
        </div>
        <div class="setting sound">
            <h2>SOUNDS</h2>
        </div>
    </div>
</template>

<script>
import VolumeControl from '@/components/MusicPlayer/VolumeControl/index.vue';

export default {
  name: 'SoundSettings',
  components: {
    VolumeControl,
  },
};
</script>

<style lang="scss">
.setting {
    margin: 10px;
    margin-bottom: 50px;

    &.music {

    }

    &.sound {

    }
}
</style>
