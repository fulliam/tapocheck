function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const warmorIdleImages = importAll(require.context('@/assets/char/enemy/warmor/idle/', false, /idle\d+\.png$/));
const warmorDeadImages = importAll(require.context('@/assets/char/enemy/warmor/dead/', false, /dead\d+\.png$/));
const warmorWalkImages = importAll(require.context('@/assets/char/enemy/warmor/walk/', false, /walk\d+\.png$/));
const warmorRunImages = importAll(require.context('@/assets/char/enemy/warmor/run/', false, /run\d+\.png$/));
const warmorJumpImages = importAll(require.context('@/assets/char/enemy/warmor/jump/', false, /jump\d+\.png$/));
const warmorAttackImages = importAll(require.context('@/assets/char/enemy/warmor/attack/', false, /attack\d+\.png$/));
const warmorAttack2Images = importAll(require.context('@/assets/char/enemy/warmor/attack2/', false, /attack2\d+\.png$/));

const WarmorAnimations = {
    idle: warmorIdleImages,
    dead: warmorDeadImages,
    walk: warmorWalkImages,
    run: warmorRunImages,
    jump: warmorJumpImages,
    attack: warmorAttackImages,
    attack2: warmorAttack2Images,
};

export { WarmorAnimations };
/* eslint-enable */
