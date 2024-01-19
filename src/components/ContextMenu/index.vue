<template>
  <div
    class="context-menu"
    v-if="isVisible"
    :style="{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }"
    @contextmenu.prevent="$emit('close-menu')"
  >
    <button @click="closeMenu">✖</button>
    <slot></slot>
  </div>
</template>

<script>
import emitter from '@/eventBus';

export default {
  name: 'ContextMenu',
  data() {
    return {
      isVisible: false,
      menuPosition: { x: 0, y: 0 }, // Позиция для контекстного меню
    };
  },
  methods: {
    openMenu(event) {
      this.isVisible = true;
      this.menuPosition = {
        x: event.clientX,
        y: event.clientY,
      };
    },
    closeMenu() {
      this.isVisible = false;
    },
  },
  mounted() {
    this.$el.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.openMenu(event);
    });
  },
  created() {
    emitter.on('open-context-menu', this.openMenu);
    emitter.on('close-context-menu', this.closeMenu);
  },
  beforeUnmount() {
    emitter.off('open-context-menu', this.openMenu);
    emitter.off('close-context-menu', this.closeMenu);

    if (this.$el) {
      this.$el.removeEventListener('contextmenu', this.openMenu);
    }
  },
};
</script>

<style lang="scss">
.context-menu {
  background-color: rgba(44, 35, 35, 0.44);
  border: 2px solid rgb(200, 180, 0);
  border-radius: 20px;
  position: absolute;
  z-index: 1020;
  width: 300px;
  height: 350px;
}
</style>
