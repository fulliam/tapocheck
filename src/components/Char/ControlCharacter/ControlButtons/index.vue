<template>
  <div class="control-buttons">
    <!--
    <div class="user-info">
      <p>{{ this.browser }}</p>
      <p>{{ device }}</p>
      <p>{{ operatingSystem }}</p>
      <p>{{ referrer }}</p>
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
      browser: '',
      device: '',
      operatingSystem: '',
      referrer: '',
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

    getBrowserInfo() {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes('edge')) {
        this.browser = 'Microsoft Edge';
      } else if (userAgent.includes('opr')) {
        this.browser = 'Opera';
      } else if (userAgent.includes('chrome')) {
        this.browser = 'Google Chrome';
      } else if (userAgent.includes('safari')) {
        this.browser = 'Safari';
      } else if (userAgent.includes('firefox')) {
        this.browser = 'Mozilla Firefox';
      } else {
        this.browser = 'Неизвестный браузер';
      }
    },

    getDeviceInfo() {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /(iPhone|iPod|iPad|Android|BlackBerry|Mobile)/i.test(userAgent);
      const isTablet = /(iPad|Android)/i.test(userAgent);

      if (isMobile) {
        this.device = 'Мобильное устройство';
      } else if (isTablet) {
        this.device = 'Планшет';
      } else {
        this.device = 'Десктопный компьютер';
      }

      if (userAgent.includes('win')) {
        this.operatingSystem = 'Windows';
      } else if (userAgent.includes('mac')) {
        this.operatingSystem = 'Mac OS';
      } else if (userAgent.includes('linux')) {
        this.operatingSystem = 'Linux';
      } else if (userAgent.includes('android')) {
        this.operatingSystem = 'Android';
      } else if (userAgent.includes('ios')) {
        this.operatingSystem = 'iOS';
      } else {
        this.operatingSystem = 'Неизвестная операционная система';
      }
    },
  },

  mounted() {
    this.getBrowserInfo();
    this.getDeviceInfo();
    this.referrer = document.referrer;
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
