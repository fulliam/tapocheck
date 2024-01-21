function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const idleImages = importAll(require.context('@/assets/char/enemy/spirit/idle/', false, /idle\d+\.png$/));
const deadImages = importAll(require.context('@/assets/char/enemy/spirit/dead/', false, /dead\d+\.png$/));
const walkImages = importAll(require.context('@/assets/char/enemy/spirit/walk/', false, /walk\d+\.png$/));
const runImages = importAll(require.context('@/assets/char/enemy/spirit/run/', false, /run\d+\.png$/));
const attackImages = importAll(require.context('@/assets/char/enemy/spirit/attack/', false, /attack\d+\.png$/));
const attack2Images = importAll(require.context('@/assets/char/enemy/spirit/attack2/', false, /attack2\d+\.png$/));

const SpiritAnimations = {
    idle: idleImages,
    dead: deadImages,
    walk: walkImages,
    run: runImages,
    attack: attackImages,
    attack2: attack2Images,
};

export { SpiritAnimations };
/* eslint-enable */
