<template>
  <div class="control-buttons" v-if="deviceInfo.device !== 'Десктопный компьютер'">
    <!--
    <div class="user-info">
      <p>{{ deviceInfo.browser }}</p>
      <p>{{ deviceInfo.device }}</p>
      <p>{{ deviceInfo.os }}</p>
      <p>{{ deviceInfo.referrer }}</p>
    </div>
    -->
    <button
      class="mobile-control left"
      @touchstart="moveLeft"
      @touchend="stopMovementLeft"
    >
      <span></span>
    </button>
    <button
      class="mobile-control right"
      @touchstart="moveRight"
      @touchend="stopMovementRight"
    >
      <span></span>
    </button>

    <button
      class="mobile-control attack"
      @touchstart="attack('attack')"
      @touchend="stopAttack('attack')"
    >
      <span>
          <img src="@/assets/char/ally/sword.png" alt=" ">
      </span>
    </button>
    <button
      class="mobile-control attack__2"
      @touchstart="attack('attack2')"
      @touchend="stopAttack('attack2')"
    >
      <span>
          <img src="@/assets/char/ally/sword.png" alt=" ">
      </span>
    </button>
    <button
      class="mobile-control attack__3"
      @touchstart="attack('attack3')"
      @touchend="stopAttack('attack3')"
    >
      <span>
          <img src="@/assets/char/ally/sword.png" alt=" ">
      </span>
    </button>
  </div>
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ControlButtons',

  data() {
    return {
      deviceInfo: {},
    };
  },

  methods: {
    moveLeft() {
      emitter.emit('mobile-move', 'left');
    },

    moveRight() {
      emitter.emit('mobile-move', 'right');
    },

    stopMovementLeft() {
      emitter.emit('mobile-stop-move', 'left');
    },

    stopMovementRight() {
      emitter.emit('mobile-stop-move', 'right');
    },

    attack(attackType) {
      emitter.emit('mobile-attack', attackType);
    },

    stopAttack(attackType) {
      emitter.emit('mobile-stop-attack', attackType);
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

  mounted() {
    emitter.on('device-info', this.handleDeviceInfo);
  },

  beforeUnmount() {
    emitter.off('device-info', this.handleDeviceInfo);
  },
};
</script>

<style lang="scss">
.control-buttons {
  position: fixed;
  bottom: 2%;
  left: 2%;
  display: flex;
  gap: 30px;
  z-index: 1000;

  & .mobile-control {
    padding: 5px 10px;
    font-size: 15px;
    background-color: #7e7b7ba7;
    border-radius: 50%;
    border: dashed blanchedalmond;
    width: 60px;
    height: 60px;

    &:active {
        background-color: lighten(#7e7b7ba7, 15%);
    }

    &.left {
      & span {
        transform: rotate(-135deg);
        display: inline-block;
        width: 15px;
        height: 15px;
        border-top: 8px solid #fff;
        border-right: 8px solid #fff;
        position: relative;
        left: 4px;
      }
    }

    &.right {
        & span {
            transform: rotate(45deg);
            display: inline-block;
            width: 15px;
            height: 15px;
            border-top: 8px solid #fff;
            border-right: 8px solid #fff;
            position: relative;
            left: -3px;
        }
    }

    &.attack {
      right: 2%;
      bottom: 2%;
      position: fixed;
      background-color: #65d6bb87;

      & span {
        position: relative;
        top: 2px;
        left: -8px;

        & img {
          height: 100%;
        }
      }

      &__2 {
        right: 13%;
        bottom: 2%;
        position: fixed;
        background-color: rgba(0, 122, 252, 0.5);

        & span {
          position: relative;
          top: 2px;
          left: -8px;

          & img {
            height: 100%;
          }
        }
      }

      &__3 {
        right: 24%;
        bottom: 2%;
        position: fixed;
        background-color: rgba(193, 9, 138, 0.5);

        & span {
          position: relative;
          top: 2px;
          left: -8px;

          & img {
            height: 100%;
          }
        }
      }
    }
  }

  & .user-info {
    position: fixed;
    top: 50px;
    left: 20px;
    display: grid;
    z-index: 1002;
    width: 100px;
    text-align: start;

    & p {
      z-index: 1010;
      width: 100%;
      color: #fff;
      height: 20px;
      font-size: 12px;
    }
  }
}
</style>
