function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const redSlimeIdleImages = importAll(require.context('@/assets/char/enemy/slimes/red/idle/', false, /idle\d+\.png$/));
const redSlimeDeadImages = importAll(require.context('@/assets/char/enemy/slimes/red/dead/', false, /dead\d+\.png$/));
const redSlimeWalkImages = importAll(require.context('@/assets/char/enemy/slimes/red/walk/', false, /walk\d+\.png$/));
const redSlimeRunImages = importAll(require.context('@/assets/char/enemy/slimes/red/run/', false, /run\d+\.png$/));
const redSlimeAttackImages = importAll(require.context('@/assets/char/enemy/slimes/red/attack/', false, /attack\d+\.png$/));
const redSlimeAttack2Images = importAll(require.context('@/assets/char/enemy/slimes/red/attack2/', false, /attack2\d+\.png$/));

const redSlimeAnimations = {
    idle: redSlimeIdleImages,
    dead: redSlimeDeadImages,
    walk: redSlimeWalkImages,
    run: redSlimeRunImages,
    attack: redSlimeAttackImages,
    attack2: redSlimeAttack2Images,
};

export { redSlimeAnimations };
/* eslint-enable */
