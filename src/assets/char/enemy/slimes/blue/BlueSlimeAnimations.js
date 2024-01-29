function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const blueSlimeIdleImages = importAll(require.context('@/assets/char/enemy/slimes/blue/idle/', false, /idle\d+\.png$/));
const blueSlimeDeadImages = importAll(require.context('@/assets/char/enemy/slimes/blue/dead/', false, /dead\d+\.png$/));
const blueSlimeWalkImages = importAll(require.context('@/assets/char/enemy/slimes/blue/walk/', false, /walk\d+\.png$/));
const blueSlimeRunImages = importAll(require.context('@/assets/char/enemy/slimes/blue/run/', false, /run\d+\.png$/));
const blueSlimeAttackImages = importAll(require.context('@/assets/char/enemy/slimes/blue/attack/', false, /attack\d+\.png$/));
const blueSlimeAttack2Images = importAll(require.context('@/assets/char/enemy/slimes/blue/attack2/', false, /attack2\d+\.png$/));

const blueSlimeAnimations = {
    idle: blueSlimeIdleImages,
    dead: blueSlimeDeadImages,
    walk: blueSlimeWalkImages,
    run: blueSlimeRunImages,
    attack: blueSlimeAttackImages,
    attack2: blueSlimeAttack2Images,
};

export { blueSlimeAnimations };
/* eslint-enable */
