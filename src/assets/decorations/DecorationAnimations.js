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
  };
  
  export { DecorationAnimations };
  /* eslint-enable */
