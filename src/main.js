import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const app = createApp(App);

// Warning about X is suppressed due to Y reason. No action needed.
app.config.warnHandler = function (msg, vm, trace) {
  const suppressedWarnings = ['./components/Bg/Act/index.vue'];

  const notSuppressedWarning = suppressedWarnings.some((path) => msg.includes(path));

  if (notSuppressedWarning) {
    console.warn(msg, vm, trace);
  } else {
    console.warn(`IGNORED: "${msg}" in ./components/Bg/Act/index.vue`);
  }
};

app.use(router).mount('#app');
