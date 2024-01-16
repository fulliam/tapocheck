function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const idleImages = importAll(require.context('@/assets/char/ally/skeleton/idle/', false, /idle\d+\.png$/));
const deadImages = importAll(require.context('@/assets/char/ally/skeleton/dead/', false, /dead\d+\.png$/));
const walkImages = importAll(require.context('@/assets/char/ally/skeleton/walk/', false, /walk\d+\.png$/));
const runImages = importAll(require.context('@/assets/char/ally/skeleton/run/', false, /run\d+\.png$/));
const jumpImages = importAll(require.context('@/assets/char/ally/skeleton/jump/', false, /jump\d+\.png$/));
const attackImages = importAll(require.context('@/assets/char/ally/skeleton/attack/', false, /attack\d+\.png$/));
const attack2Images = importAll(require.context('@/assets/char/ally/skeleton/attack2/', false, /attack2\d+\.png$/));
const attack3Images = importAll(require.context('@/assets/char/ally/skeleton/attack3/', false, /attack3\d+\.png$/));

const SkeletonAnimations = {
  idle: idleImages,
  dead: deadImages,
  walk: walkImages,
  run: runImages,
  jump: jumpImages,
  attack: attackImages,
  attack2: attack2Images,
  attack3: attack3Images,
};

export { SkeletonAnimations };
/* eslint-enable */
