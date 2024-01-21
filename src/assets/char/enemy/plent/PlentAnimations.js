function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const plentIdleImages = importAll(require.context('@/assets/char/enemy/plent/idle/', false, /idle\d+\.png$/));
const plentDeadImages = importAll(require.context('@/assets/char/enemy/plent/dead/', false, /dead\d+\.png$/));
const plentWalkImages = importAll(require.context('@/assets/char/enemy/plent/walk/', false, /walk\d+\.png$/));
const plentRunImages = importAll(require.context('@/assets/char/enemy/plent/run/', false, /walk\d+\.png$/));
const plentAttackImages = importAll(require.context('@/assets/char/enemy/plent/attack2/', false, /attack2\d+\.png$/));
const plentAttack2Images = importAll(require.context('@/assets/char/enemy/plent/attack3/', false, /attack3\d+\.png$/));

const PlentAnimations = {
    idle: plentIdleImages,
    dead: plentDeadImages,
    walk: plentWalkImages,
    run: plentRunImages,
    attack: plentAttackImages,
    attack2: plentAttack2Images,
};

export { PlentAnimations };
/* eslint-enable */
