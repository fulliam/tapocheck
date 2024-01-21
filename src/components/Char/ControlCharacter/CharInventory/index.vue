<template>
  <button class="show-inventory" @click="openInventory">open</button>
  <div v-if="showInventory" class="inventory">
    <button @click="showInventory = false">Close</button>
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div v-if="activeTab === 0" class="characteristics">
      <h2>Characteristics</h2>
      <img :src="player.currentCharacter.animations.idle[0]" alt=" ">
      <p>Attack: {{ player.attacks.attack.damage }}</p>
      <p>Health: {{ player.health }}</p>
      <p>Skin: {{ player.currentCharacter.name }}</p>
    </div>
    <div v-if="activeTab === 1" class="equipment">
      <h2>Equipment</h2>
      <!-- Display equipment here -->
    </div>
    <div v-if="activeTab === 2" class="inventory-items">
      <h2>Inventory</h2>
      <!-- Display inventory items here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharInventory',

  props: ['player'],

  data() {
    return {
      showInventory: false,
      activeTab: 0,
      tabs: ['Characteristics', 'Equipment', 'Inventory'],
    };
  },
  methods: {
    openInventory() {
      this.showInventory = true;
    },
  },
  mounted() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'i' || event.key === 'I') {
        this.openInventory();
      }
    });
  },
};
</script>

<style lang="scss">
.inventory {
  position: absolute;
  margin: 8%;
  left: 10%;
  width: 60%;
  height: 60%;
  background-color: #fff;
  border: 1px solid #000;
  padding: 20px;
  overflow: auto;
  z-index: 999;
}

.show-inventory {
  z-index: 999;
  position: absolute;
  top: 2%;
  right: 10%;
}
</style>
