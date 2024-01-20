<script>
import emitter from '@/eventBus';

export default {
  name: 'DeviceInfo',

  data() {
    return {
      browser: '',
      device: '',
      operatingSystem: '',
      referrer: '',
      sendInfoTimer: null,
    };
  },

  methods: {
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

    emitDeviceInfo() {
      this.sendInfoTimer = setTimeout(() => {
        emitter.emit('device-info', {
          browser: this.browser,
          device: this.device,
          os: this.operatingSystem,
          referrer: this.referrer,
        });
      }, 100);
    },
  },

  mounted() {
    this.getBrowserInfo();
    this.getDeviceInfo();
    this.referrer = document.referrer;
    this.emitDeviceInfo();
  },

  beforeUnmount() {
    clearTimeout(this.sendInfoTimer);
  },

};
</script>
