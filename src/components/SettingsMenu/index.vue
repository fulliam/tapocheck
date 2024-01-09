<template>
<div class="dev">
<h1><span>⚙</span> SETTINGS:</h1>
    <div class="settings menu pixel-border">
        <ul>
            <li v-show="!anySettingsOpen || soundSettingsIsOpen">
                <button
                    class="submenu button"
                    @click="toggleSetting('soundSettingsIsOpen')"
                    v-show="!anySettingsOpen"
                >
                    <div class="name">
                        <span class="letter">S</span>
                        <span class="letter">O</span>
                        <span class="letter">U</span>
                        <span class="letter">N</span>
                        <span class="letter">D</span>
                    </div>
                </button>

                <div class="settings submenu" v-show="soundSettingsIsOpen">
                    <SoundSettings/>
                </div>

                <button
                    class="submenu button"
                    @click="toggleSetting('soundSettingsIsOpen')"
                    v-show="soundSettingsIsOpen"
                >
                    <span>back</span>
                </button>
            </li>

            <li v-show="!anySettingsOpen || screenSettingsIsOpen">
                <button
                    class="submenu button"
                    @click="toggleSetting('screenSettingsIsOpen')"
                    v-show="!anySettingsOpen"
                >
                    <div class="name">
                        <span class="letter">S</span>
                        <span class="letter">C</span>
                        <span class="letter">R</span>
                        <span class="letter">E</span>
                        <span class="letter">E</span>
                        <span class="letter">N</span>
                    </div>
                </button>

                <div class="settings submenu" v-show="screenSettingsIsOpen">
                    тут должны быть настройки разрешения экрана
                </div>

                <button
                    class="submenu button"
                    @click="toggleSetting('screenSettingsIsOpen')"
                    v-show="screenSettingsIsOpen"
                >
                    <span>back</span>
                </button>
            </li>

            <li v-show="!anySettingsOpen || languageSettingsIsOpen">
                <button
                    class="submenu button"
                    @click="toggleSetting('languageSettingsIsOpen')"
                    v-show="!anySettingsOpen"
                >
                    <div class="name">
                        <span class="letter">L</span>
                        <span class="letter">A</span>
                        <span class="letter">N</span>
                        <span class="letter">G</span>
                        <span class="letter">U</span>
                        <span class="letter">A</span>
                        <span class="letter">G</span>
                        <span class="letter">E</span>
                    </div>
                </button>

                <div class="settings submenu" v-show="languageSettingsIsOpen">
                    тут должен быть выбор языка
                </div>

                <button
                    class="submenu button"
                    @click="toggleSetting('languageSettingsIsOpen')"
                    v-show="languageSettingsIsOpen"
                >
                    <span>back</span>
                </button>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import SoundSettings from './SoundSettings/index.vue';

export default {
  name: 'SetingsMenu',
  components: {
    SoundSettings,
  },
  data() {
    return {
      soundSettingsIsOpen: false,
      screenSettingsIsOpen: false,
      languageSettingsIsOpen: false,
    };
  },
  methods: {
    toggleSetting(setting) {
      const isClosing = this[setting];

      this.soundSettingsIsOpen = false;
      this.screenSettingsIsOpen = false;
      this.languageSettingsIsOpen = false;

      if (!isClosing) {
        this[setting] = true;
      }
    },
  },
  computed: {
    anySettingsOpen() {
      return this.soundSettingsIsOpen || this.screenSettingsIsOpen || this.languageSettingsIsOpen;
    },
  },
};
</script>

<style lang="scss">
@import url('@/assets/styles/Settings/SettingsMenu/index.scss');

@mixin step4( $width, $color, $bgcolor ) {
  box-shadow:
    $width 0 $bgcolor,
    -$width 0 $bgcolor,
    0 (-$width) $bgcolor,
    0 $width $bgcolor,
    2*$width 0 $bgcolor,
    -2*$width 0 $bgcolor,
    0 (-2*$width) $bgcolor,
    0 2*$width $bgcolor,
    0 0 0 $width $bgcolor,
    3*$width 0 $bgcolor,
    -3*$width 0 $bgcolor,
    0 3*$width $bgcolor,
    0 (-3*$width) $bgcolor,
    0 (-$width) 0 $width $bgcolor,
    0 $width 0 $width $bgcolor,
    $width 0 0 $width $bgcolor,
    -$width 0 0 $width $bgcolor,
    4*$width 0 $color,
    -4*$width 0 $color,
    0 (-4*$width) $color,
    0 4*$width $color,
    2*$width 0 0 $width $color,
    -2*$width 0 0 $width $color,
    0 2*$width 0 $width $color,
    0 (-2*$width) 0 $width $color,
    0 0 0 2*$width $color;
    margin: 4*$width auto;
}

.settings {
    &.menu {
        top: -150px;
        position: relative;

        & .submenu {
            &.button {
                @include step4( 3px, rgb(160, 1, 1), #00b389);

                &:hover {
                    @include step4( 3px, #0ef372, #029a44 );
                }
            }
        }
    }
}
</style>
