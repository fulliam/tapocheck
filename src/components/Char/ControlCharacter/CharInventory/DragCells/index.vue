<template>
  <div id="grid">
    <div
      v-for="(cell, index) in cells"
      :key="index"
      class="cell"
      :class="{ 'drop-target': index === dropTargetIndex }"
      @dragover.prevent="dragOver($event, index)"
      @drop="drop($event, index)"
      @dragleave="dragLeave"
      @touchmove.prevent="drag($event, index)"
      @touchend="drop($event, index)"
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
    </div>
  </div>
</template>

<script>
import items from './items';

export default {
  name: 'DragCells',

  data() {
    return {
      cells: items,
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
// need add adaptive

@mixin pixel-border( $width, $color, $bgcolor ) {
  box-shadow:
    4*$width 0 $bgcolor,
    -4*$width 0 $bgcolor,
    0 (-4*$width) $bgcolor,
    0 4*$width $bgcolor,
    $width 0 0 2*$width $bgcolor,
    -$width 0 0 2*$width $bgcolor,
    0 (-$width) 0 2*$width $bgcolor,
    0 $width 0 2*$width $bgcolor,
    5*$width 0 $color,
    -5*$width 0 $color,
    0 (-5*$width) $color,
    0 5*$width $color,
    0 0 0 3*$width $color,
    0 2*$width 0 2*$width $color,
    0 (-2*$width) 0 2*$width $color,
    2*$width 0 0 2*$width $color,
    (-2*$width) 0 0 2*$width $color;
}

#grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 15px;
  width: 60%;
  height: 60%;
  position: relative;
  margin: 2%;
  margin-right: 5%;
  padding: 2%;

  & .cell {
    position: relative;
    background-color: #b2b1b1;
    height: 50px;
    width: 50px;
    @include pixel-border( 1px, rgba(229, 229, 229, 0.45), rgba(0, 0, 0, 0) );

    &.drop-target {
      @include pixel-border( 1px, #c8b400, rgba(0, 0, 0, 0) );
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: grab;
      border-radius: 5px;
    }

    & .quantity {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 15px;
        color: #c8b400;
        padding: 2px;
        padding-left: 5px;
        background: #000000f7;
        width: min-content;
        height: min-content;
        border-radius: 9px 0 0 0;
    }
  }

  @media (max-height: 536px), (max-width: 992px) {
    & .cell {
        height: 30px;
        width: 30px;

        & .quantity {
            font-size: 10px;
        }
    }
  }
}
</style>
