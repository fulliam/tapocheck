function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const greenSlimeIdleImages = importAll(require.context('@/assets/char/enemy/slimes/green/idle/', false, /idle\d+\.png$/));
const greenSlimeDeadImages = importAll(require.context('@/assets/char/enemy/slimes/green/dead/', false, /dead\d+\.png$/));
const greenSlimeWalkImages = importAll(require.context('@/assets/char/enemy/slimes/green/walk/', false, /walk\d+\.png$/));
const greenSlimeRunImages = importAll(require.context('@/assets/char/enemy/slimes/green/run/', false, /run\d+\.png$/));
const greenSlimeAttackImages = importAll(require.context('@/assets/char/enemy/slimes/green/attack/', false, /attack\d+\.png$/));
const greenSlimeAttack2Images = importAll(require.context('@/assets/char/enemy/slimes/green/attack2/', false, /attack2\d+\.png$/));

const greenSlimeAnimations = {
    idle: greenSlimeIdleImages,
    dead: greenSlimeDeadImages,
    walk: greenSlimeWalkImages,
    run: greenSlimeRunImages,
    attack: greenSlimeAttackImages,
    attack2: greenSlimeAttack2Images,
};

export { greenSlimeAnimations };
/* eslint-enable */
