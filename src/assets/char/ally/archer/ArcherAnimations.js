function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const idleImages = importAll(require.context('@/assets/char/ally/archer/idle/', false, /idle\d+\.png$/));
const deadImages = importAll(require.context('@/assets/char/ally/archer/dead/', false, /dead\d+\.png$/));
const walkImages = importAll(require.context('@/assets/char/ally/archer/walk/', false, /walk\d+\.png$/));
const runImages = importAll(require.context('@/assets/char/ally/archer/run/', false, /run\d+\.png$/));
const jumpImages = importAll(require.context('@/assets/char/ally/archer/jump/', false, /jump\d+\.png$/));
const attackImages = importAll(require.context('@/assets/char/ally/archer/attack/', false, /attack\d+\.png$/));
const attack2Images = importAll(require.context('@/assets/char/ally/archer/attack2/', false, /attack2\d+\.png$/));
const attack3Images = importAll(require.context('@/assets/char/ally/archer/attack3/', false, /attack3\d+\.png$/));

const ArcherAnimations = {
  idle: idleImages,
  dead: deadImages,
  walk: walkImages,
  run: runImages,
  jump: jumpImages,
  attack: attackImages,
  attack2: attack2Images,
  attack3: attack3Images,
};

export { ArcherAnimations };
/* eslint-enable */
