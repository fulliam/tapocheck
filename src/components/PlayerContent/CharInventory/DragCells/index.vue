<template>
  <div id="grid">
    <div
      v-for="(cell, index) in cells"
      :key="index"
      class="cell"
      :class="{ 'drop-target': index === dropTargetIndex }"
      :data-id="index"
      @dragover.prevent="dragOver($event, index)"
      @drop="drop($event, index)"
      @dragleave="dragLeave"
      @touchstart="touchStart($event, index)"
      @touchmove.prevent="touchMove($event)"
      @touchend="touchEnd($event, index)"
    >
      <img
        v-if="cell.image"
        :src="cell.image"
        :style="{ background: rarityGradients[cell.rarity] }"
        draggable="true"
        @dragstart="drag($event, index)"
        alt=" "
      />
      <div v-if="cell.quantity !== 0" class="quantity">{{ cell.quantity }}</div>
      <div v-if="cell.description" class="tooltip">{{ cell.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragCells',

  props: ['items'],

  data() {
    return {
      cells: this.items,
      draggedImage: null,
      draggedIndex: null,
      dropTargetIndex: null,
    };
  },

  methods: {
    drag(event, index) {
      this.draggedImage = this.cells[index];
      this.draggedIndex = index;
    },

    drop(event, index) {
      if (index === this.draggedIndex) {
        this.dropTargetIndex = null;
        return;
      }

      const targetCell = this.cells[index];
      if (this.draggedImage.image === targetCell.image) {
        targetCell.quantity += this.draggedImage.quantity;
        this.cells[this.draggedIndex] = { id: this.draggedIndex, quantity: 0, image: null };
      } else {
        this.cells[index] = this.draggedImage;
        this.cells[this.draggedIndex] = targetCell;
      }
      this.draggedImage = null;
      this.draggedIndex = null;
      this.dropTargetIndex = null;
    },

    dragOver(event, index) {
      this.dropTargetIndex = index;
    },

    dragLeave() {
      this.dropTargetIndex = null;
    },

    touchStart(event, index) {
      this.draggedImage = this.cells[index];
      this.draggedIndex = index;

      this.startPos = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    },

    touchMove(event) {
      if (!this.draggedImage) return;
      /* eslint-disable-next-line max-len */
      const elementUnderFinger = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);

      const newDropTargetIndex = Number(elementUnderFinger.dataset.id);

      if (!elementUnderFinger || elementUnderFinger.dataset.id === undefined) {
        this.dropTargetIndex = null;
        return;
      }

      if (newDropTargetIndex !== this.dropTargetIndex) {
        this.dropTargetIndex = newDropTargetIndex;
      }
    },

    touchEnd(event, index) {
      console.log(index);
      if (this.dropTargetIndex !== null) {
        this.drop(event, this.dropTargetIndex);
      }
    },
  },

  computed: {
    rarityGradients() {
      return {
        common: 'radial-gradient(circle at center, #c0c0c0, #808080)', // Серый градиент
        rare: 'radial-gradient(circle at center, #7FFF00, #006400)', // Зеленый градиент
        unique: 'radial-gradient(circle at center, #1E90FF, #00008B)', // Синий градиент
        mythic: 'radial-gradient(circle at center, #EE82EE, #4B0082)', // Фиолетовый градиент
        legendary: 'radial-gradient(circle at center, #FFD700, #8B6508)', // Золотой градиент
      };
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/PlayerContent/Inventory/DragCells/index.scss';
</style>
