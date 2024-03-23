function importAll(r) {
  return r.keys().map(r);
}

const heavyArmorImages = importAll(require.context('@/assets/items/armors/', false, /heavyArmor\w+\d*\.png$/));
const lightArmorImages = importAll(require.context('@/assets/items/armors/', false, /lightArmor\w+\d*\.png$/));

const axeImages = importAll(require.context('@/assets/items/weapons/', false, /axe\d+\.png$/));
const bowImages = importAll(require.context('@/assets/items/weapons/', false, /bow\d+\.png$/));
const daggerImages = importAll(require.context('@/assets/items/weapons/', false, /dagger\d+\.png$/));
const staffImages = importAll(require.context('@/assets/items/weapons/', false, /staff\d+\.png$/));
const swordImages = importAll(require.context('@/assets/items/weapons/', false, /sword\d+\.png$/));

const allPotionImages = importAll(require.context('@/assets/items/potions/', false, /all\d+\.png$/));
const endurancePotionImages = importAll(require.context('@/assets/items/potions/', false, /endurance\d+\.png$/));
const healthPotionImages = importAll(require.context('@/assets/items/potions/', false, /health\d+\.png$/));
const manaPotionImages = importAll(require.context('@/assets/items/potions/', false, /mana\d+\.png$/));
const upPotionImage = importAll(require.context('@/assets/items/potions/', false, /UP\d+\.png$/));

const necklaceImages = importAll(require.context('@/assets/items/jewelry/', false, /necklace\d+\.png$/));
const ringImages = importAll(require.context('@/assets/items/jewelry/', false, /ring\d+\.png$/));

const bookImages = importAll(require.context('@/assets/items/books/', false, /\w*\.png$/));
const consumablesImages = importAll(require.context('@/assets/items/consumables/', false, /\w*\.png$/));

const stonesImages = importAll(require.context('@/assets/items/stones/', false, /\w*\.png$/));

const itemImages = {
  armor: {
    heavy: {
      belt: heavyArmorImages[0],
      boots: heavyArmorImages[1],
      chest: heavyArmorImages[2],
      chest2: heavyArmorImages[3],
      glove: heavyArmorImages[4],
      helmet: heavyArmorImages[5],
      pants: heavyArmorImages[7],
      helmet2: heavyArmorImages[6],
      pants2: heavyArmorImages[8],
    },

    light: {
      belt: heavyArmorImages[0],
      boots: lightArmorImages[0],
      chest: lightArmorImages[1],
      glove: lightArmorImages[4],
      helmet: lightArmorImages[5],
      chest2: lightArmorImages[2],
      helmet2: lightArmorImages[6],
      pants: lightArmorImages[8],
      chest3: lightArmorImages[3],
      helmet3: lightArmorImages[7],
    },
  },

  weapon: {
    axe: {
      x1: axeImages[0],
      x2: axeImages[1],
    },

    bow: bowImages[0],

    dagger: {
      x1: daggerImages[0],
      x2: daggerImages[1],
    },

    staff: {
      x1: staffImages[0],
      x2: staffImages[1],
      x3: staffImages[2],
      x4: staffImages[3],
    },

    sword: {
      x1: swordImages[0],
      x2: swordImages[1],
      x3: swordImages[2],
      x4: swordImages[3],
      x5: swordImages[4],
      x6: swordImages[5],
      x7: swordImages[6],
    },
  },

  potion: {
    endurance: {
      x1: endurancePotionImages[0],
      x2: endurancePotionImages[1],
      x3: endurancePotionImages[2],
    },

    health: {
      x1: healthPotionImages[0],
      x2: healthPotionImages[1],
      x3: healthPotionImages[2],
      x4: healthPotionImages[3],
    },

    mana: {
      x1: manaPotionImages[0],
      x2: manaPotionImages[1],
      x3: manaPotionImages[2],
    },

    all: {
      x1: allPotionImages[0],
      x2: allPotionImages[1],
      x3: allPotionImages[2],
      x4: allPotionImages[3],
    },

    up: upPotionImage[0],
  },

  jewelry: {
    necklace: {
      x1: necklaceImages[0],
      x2: necklaceImages[1],
      x3: necklaceImages[2],
    },

    ring: {
      x1: ringImages[0],
      x2: ringImages[1],
    },
  },

  book: {
    blue: bookImages[0],
    brown: bookImages[1],
    green: bookImages[2],
    orange: bookImages[3],
    red: bookImages[4],
    special: bookImages[5],
    special2: bookImages[6],
    yellow: bookImages[7],
  },

  consumable: {
    ace: consumablesImages[0],
    box: consumablesImages[1],
    bunch: consumablesImages[2],
    candle: consumablesImages[3],
    key: consumablesImages[4],
    lamp: consumablesImages[5],
    scroll: consumablesImages[6],
    torch: consumablesImages[7],
  },

  stone: {
    black: stonesImages[0],
    blue: stonesImages[1],
    green: stonesImages[2],
    purple: stonesImages[3],
    red: stonesImages[4],
    yellow: stonesImages[5],
  },
};

export default itemImages;
