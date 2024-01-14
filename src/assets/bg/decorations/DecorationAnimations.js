function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
  const fireImages = importAll(require.context('@/assets/bg/decorations/fire/', false, /fire\d+\.png$/));
  const explosionImages = importAll(require.context('@/assets/bg/decorations/explosion/fire', false, /explosion\d+\.png$/));
  const lightningExplosionImages = importAll(require.context('@/assets/bg/decorations/explosion/lightning', false, /lightningExplosion\d+\.png$/));
  const lightningImages = importAll(require.context('@/assets/bg/decorations/lightning/linear', false, /lightning\d+\.png$/));
  const lightningCycleImages = importAll(require.context('@/assets/bg/decorations/lightning/cycle', false, /lightningCycle\d+\.png$/));
  const smokeImages = importAll(require.context('@/assets/bg/decorations/smoke/', false, /smoke\d+\.png$/));
  
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
  };
  
  export { DecorationAnimations };
  /* eslint-enable */
