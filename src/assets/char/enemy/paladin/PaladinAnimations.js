function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const paladinIdleImages = importAll(require.context('@/assets/char/enemy/paladin/idle/', false, /idle\d+\.png$/));
const paladinDeadImages = importAll(require.context('@/assets/char/enemy/paladin/dead/', false, /dead\d+\.png$/));
const paladinWalkImages = importAll(require.context('@/assets/char/enemy/paladin/walk/', false, /walk\d+\.png$/));
const paladinRunImages = importAll(require.context('@/assets/char/enemy/paladin/run/', false, /run\d+\.png$/));
const paladinJumpImages = importAll(require.context('@/assets/char/enemy/paladin/jump/', false, /jump\d+\.png$/));
const paladinAttackImages = importAll(require.context('@/assets/char/enemy/paladin/attack/', false, /attack\d+\.png$/));
const paladinAttack2Images = importAll(require.context('@/assets/char/enemy/paladin/attack2/', false, /attack2\d+\.png$/));

const PaladinAnimations = {
    idle: paladinIdleImages,
    dead: paladinDeadImages,
    walk: paladinWalkImages,
    run: paladinRunImages,
    jump: paladinJumpImages,
    attack: paladinAttackImages,
    attack2: paladinAttack2Images,
};
export { PaladinAnimations };
/* eslint-enable */
