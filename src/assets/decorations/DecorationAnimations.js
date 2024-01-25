function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const fireImages = importAll(require.context('@/assets/decorations/fire/', false, /fire\d+\.png$/));
const explosionImages = importAll(require.context('@/assets/decorations/explosion/fire', false, /explosion\d+\.png$/));
const lightningExplosionImages = importAll(require.context('@/assets/decorations/explosion/lightning', false, /lightningExplosion\d+\.png$/));
const lightningImages = importAll(require.context('@/assets/decorations/lightning/linear', false, /lightning\d+\.png$/));
const lightningCycleImages = importAll(require.context('@/assets/decorations/lightning/cycle', false, /lightningCycle\d+\.png$/));
const smokeImages = importAll(require.context('@/assets/decorations/smoke/', false, /smoke\d+\.png$/));

const effectRunSmokeImages = importAll(require.context('@/assets/decorations/effects/runSmoke', false, /runSmoke\d+\.png$/));
const effectGroundSmokeImages = importAll(require.context('@/assets/decorations/effects/groundSmoke', false, /groundSmoke\d+\.png$/));
const effectExplosionSmokeImages = importAll(require.context('@/assets/decorations/effects/explosionSmoke', false, /explosionSmoke\d+\.png$/));

const goldChestIdleImages = importAll(require.context('@/assets/decorations/chest/gold/idle', false, /idle\d+\.png$/));
const goldChestOpenImages = importAll(require.context('@/assets/decorations/chest/gold/open', false, /open\d+\.png$/));

const woodChestIdleImages = importAll(require.context('@/assets/decorations/chest/wood/idle', false, /idle\d+\.png$/));
const woodChestOpenImages = importAll(require.context('@/assets/decorations/chest/wood/open', false, /open\d+\.png$/));

const blackChestIdleImages = importAll(require.context('@/assets/decorations/chest/black/idle', false, /idle\d+\.png$/));
const blackChestOpenImages = importAll(require.context('@/assets/decorations/chest/black/open', false, /open\d+\.png$/));

const whiteChestIdleImages = importAll(require.context('@/assets/decorations/chest/white/idle', false, /idle\d+\.png$/));
const whiteChestOpenImages = importAll(require.context('@/assets/decorations/chest/white/open', false, /open\d+\.png$/));

const pinkDotImages = importAll(require.context('@/assets/decorations/dots/pink', false, /dot\d+\.png$/));
const greenDotImages = importAll(require.context('@/assets/decorations/dots/green', false, /dot\d+\.png$/));

const DecorationAnimations = {
    fire: fireImages,
    explosion: {
      fire: explosionImages,
      lightning: lightningExplosionImages,
    },
    lightning: {
      linear: lightningImages,
      cycle: lightningCycleImages,
    },
    smoke: smokeImages,

    effect: {
      runSmoke: effectRunSmokeImages,
      groundSmoke: effectGroundSmokeImages,
      poof: effectExplosionSmokeImages,
    },

    chest: {
      woodChest: {
        idle: woodChestIdleImages,
        open: woodChestOpenImages,
      },
      goldChest: {
        idle: goldChestIdleImages,
        open: goldChestOpenImages,
      },
      blackChest: {
        idle: blackChestIdleImages,
        open: blackChestOpenImages,
      },
      whiteChest: {
        idle: whiteChestIdleImages,
        open: whiteChestOpenImages,
      },
    },

    dot: {
      pink: pinkDotImages,
      green: greenDotImages,
    },
};

export { DecorationAnimations };
/* eslint-enable */
