import { createRouter, createWebHistory } from 'vue-router';
import SettingsMenu from '@/components/SettingsMenu/index.vue';
import MainPage from '../pages/Main/index.vue';
import SpritesBg from '../pages/GameBg/SpritesBg.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/sprites',
    name: 'SpritesBg',
    component: SpritesBg,
  },
  {
    path: '/settings',
    name: 'SettingsMenu',
    component: SettingsMenu,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
