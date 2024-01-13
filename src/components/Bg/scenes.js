import { BgParts } from '@/assets/bg/Backgrounds';
// import { decorations } from '@/assets/decorations/decorations';

const actsData = {
  ActI: [
    [ // Сцена 1
      { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
      { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
      { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
      { src: BgParts.forest.road, parallaxSpeed: 0.9 },
      { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
    ],
    [ // Сцена 2
      { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
      { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
      { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
      { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
      { src: BgParts.forest.road, parallaxSpeed: 0.9 },
      { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
    ],
    [ // Сцена 3
      { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
      { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
      { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
      { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
      { src: BgParts.forest.road, parallaxSpeed: 0.9 },
      { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
    ],
    [ // Сцена 4
      { src: BgParts.forest.sky, parallaxSpeed: 0.2 },
      { src: BgParts.forest.bg, parallaxSpeed: 0.4 },
      { src: BgParts.forest.trees, parallaxSpeed: 0.6 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.8 },
      { src: BgParts.forest.road, parallaxSpeed: 0.9 },
      { src: BgParts.forest.lianas, parallaxSpeed: 0.9 },
      { src: BgParts.cemetery.tree, style: { position: 'relative', left: '-25%' }, parallaxSpeed: 0.9 },
      { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
      { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
      { src: BgParts.forest.fireflys, class: 'firefly-animation', parallaxSpeed: 1 },
    ],
  ],
  ActII: [
    [ // Сцена 1
      { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 2
      { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 3
      { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.4 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 4
      { src: BgParts.ruin.sky, parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.5 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.wall, parallaxSpeed: 0.8 },
      { src: BgParts.cemetery.ground, parallaxSpeed: 0.8 },
    ],
  ],
  ActIII: [
    [ // Сцена 1
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
      { src: BgParts.forest.road, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 2
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.trees, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
      { src: BgParts.forest.road, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 3
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.ruin.trees, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
      { src: BgParts.forest.road, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 4
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.ruin.trees, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, parallaxSpeed: 0.6 },
      { src: BgParts.forest.road, parallaxSpeed: 0.8 },
      { src: BgParts.ruin.statue, style: { position: 'relative', top: '25%', left: '-40%' }, parallaxSpeed: 0.8 },
    ],
  ],
  ActIV: [
    [ // Сцена 1
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
      { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 2
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
      { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 3
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
      { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },

    ],
    [ // Сцена 4
      { class: 'cemetery-sky', parallaxSpeed: 0.2 },
      { src: BgParts.cemetery.graves, parallaxSpeed: 0.4 },
      { src: BgParts.forest.grasses, style: { position: 'relative', top: '10%' }, parallaxSpeed: 0.7 },
      { src: BgParts.ruin.ruins2, style: { position: 'relative', top: '-85%' }, parallaxSpeed: 0.8 },
      { src: BgParts.ruin.statue, style: { position: 'relative', top: '-175%', left: '-90%' }, parallaxSpeed: 0.8 },
    ],
  ],
  ActV: [
    [ // Сцена 1
      { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
      { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
      { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 2
      { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
      { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
      { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 3
      { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
      { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
      { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
      { src: BgParts.castle.candeliar, parallaxSpeed: 0.8 },
      { src: BgParts.castle.candeliar, style: { position: 'relative', top: '60%', left: '-30%' }, parallaxSpeed: 0.8 },
    ],
    [ // Сцена 4
      { src: BgParts.castle.bg, parallaxSpeed: 0.2 },
      { src: BgParts.castle.mountains, parallaxSpeed: 0.2 },
      { src: BgParts.castle.windows, parallaxSpeed: 0.4 },
      { src: BgParts.castle.columns, parallaxSpeed: 0.6 },
      { src: BgParts.castle.floor, parallaxSpeed: 0.8 },
      { src: BgParts.castle.candeliar, parallaxSpeed: 0.8 },
      { src: BgParts.castle.dragon, style: { position: 'relative', top: '27%' }, parallaxSpeed: 0.8 },
      { src: BgParts.castle.candeliar, style: { position: 'relative', top: '-40%', right: '20%' }, parallaxSpeed: 0.8 },
    ],
  ],
  ActVI: [
    [ // Сцена 1
      { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
      { src: BgParts.cave.cave6, parallaxSpeed: 0.2 },
      { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.3 },
      { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
      { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
      { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
      {
        src: BgParts.cave.cave1, parallaxSpeed: 0.7,
      },
      {
        src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
      },
      { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
    ],
    [ // Сцена 1
      { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
      { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.2 },
      { src: BgParts.cave.cave6, parallaxSpeed: 0.3 },
      { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
      { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
      { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
      {
        src: BgParts.cave.cave1, parallaxSpeed: 0.7,
      },
      {
        src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
      },
      { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
    ],
    [ // Сцена 1
      { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
      { src: BgParts.cave.cave6, parallaxSpeed: 0.2 },
      { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.3 },
      { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
      { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
      { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
      {
        src: BgParts.cave.cave1, parallaxSpeed: 0.7,
      },
      {
        src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
      },
      { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
    ],
    [ // Сцена 1
      { src: BgParts.cave.cave7, parallaxSpeed: 0.1 },
      { src: BgParts.cave.cave6, style: { position: 'absolute', left: '15%' }, parallaxSpeed: 0.2 },
      { src: BgParts.cave.cave6, parallaxSpeed: 0.3 },
      { src: BgParts.cave.cave5, parallaxSpeed: 0.4 },
      { src: BgParts.cave.cave4, parallaxSpeed: 0.5 },
      { src: BgParts.cave.cave3, parallaxSpeed: 0.6 },
      {
        src: BgParts.cave.cave1, parallaxSpeed: 0.7,
      },
      {
        src: BgParts.ruin.grass, style: { position: 'absolute', top: '38%' }, parallaxSpeed: 0.8,
      },
      { src: BgParts.cave.cave1, style: { rotate: '-180deg' }, parallaxSpeed: -0.9 },
    ],
  ],
};

export default actsData;
