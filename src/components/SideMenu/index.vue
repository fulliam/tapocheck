<template>
  <div class="side-menu">
    <div class="app-menu">
      <div class="side-menu-nav">
        <slot></slot>
      </div>
    </div>
  </div>
  <button class="side-menu-icon">
    <span>—</span>
    <span>—</span>
    <span>—</span>
  </button>
</template>

<script>
export default {
  name: 'SideMenu',
  methods: {
    toggleClassMenu() {
      this.myMenu.classList.add('side-menu--animatable');
      if (!this.myMenu.classList.contains('side-menu--visible')) {
        this.myMenu.classList.add('side-menu--visible');
      } else {
        this.myMenu.classList.remove('side-menu--visible');
      }
    },
    OnTransitionEnd() {
      this.myMenu.classList.remove('side-menu--animatable');
    },
  },
  mounted() {
    this.myMenu = document.querySelector('.side-menu');
    this.oppMenu = document.querySelector('.side-menu-icon');
    this.myMenu.addEventListener('transitionend', this.OnTransitionEnd, false);
    this.oppMenu.addEventListener('click', this.toggleClassMenu, false);
    this.myMenu.addEventListener('click', this.toggleClassMenu, false);
  },
};
</script>

<style lang="scss" scoped>
@import url('@/assets/styles/SideMenu/index.scss');
</style>
