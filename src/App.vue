<template>
  <SideMenu>
    <nav>
      <router-link to="settings">[Settings]</router-link>
      <br/>
      <router-link to="sprites">[SpritesBg]</router-link>
      <br/>
      <router-link to="/">[Game]</router-link>
    </nav>
  </SideMenu>
  <div class="dev">
    <MusicPlayer
      style="opacity: 0;
             padding: 0;
             margin: 0;
             width: 0;
             height: 0;"
    />
  </div>
  <router-view @contextmenu.prevent/>
</template>

<script>
import SideMenu from './components/SideMenu/index.vue';
import MusicPlayer from './components/MusicPlayer/index.vue';

export default {
  components: {
    SideMenu,
    MusicPlayer,
  },
  mounted() {
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  },
};
</script>

<style lang="scss">
@import url('./assets/styles/Settings/PixelBorder/index.scss');

#app {
  font-family: 'Press Start 2P';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #003e2f;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

nav {
  font-family: 'Press Start 2P';
  position: absolute;
  left: 4%;
  top: 4%;
  text-align: initial;

  & a {
    color: rgb(253, 71, 101);
    cursor: pointer;

    &:hover {
      color: lighten(rgb(253, 71, 101), 10%);
    }
  }
}

a {
  text-decoration: none;
  user-select: none;
}

body {
  margin: 0;
  padding: 0;
}

html, body {
  // cursor: none;
  background-color: #003e2f;
  user-select: none;
}

.dev {
  display: grid;
  justify-items: center;
  align-items: center;

  & h1 {
    color: rgb(0, 179, 137);
    position: relative;

    &:hover {
      color: lighten(rgb(0, 179, 137), 10%);

      & span {
        color: lighten(#029a44, 10%);
      }
    }

    & span {
      color: #029a44;
      font-size: 64px;
    }
  }

  &-info {
    position: absolute;
    display: flex;
    left: 20px;
    top: 180px;
    color: #fff;
    font-size: 12px;
    z-index: 100;
  }
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.char {
  border: 2px solid rgb(200, 180, 0);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  background-color: #8d8b2d8f;
  box-shadow: inset 0px 0px 20px black;
  background-size: cover;
  animation: slide 5s linear infinite;
}

button {
  z-index: 999;
  font-family: 'Press Start 2P';
  cursor: pointer;
  width: 150px;
  margin: 5px;
  padding: 3px;
  background-color: #1e1e1e;
  border: 2px solid rgb(200, 180, 0);
  border-radius: 10px;
  color: rgb(200, 180, 0);
  transition: color 0.5s, border-color 0.5s;
  box-shadow: 3px 3px 3px black;

  &:hover {
    border-color: orange;
    color: orange;
  }
}
</style>
