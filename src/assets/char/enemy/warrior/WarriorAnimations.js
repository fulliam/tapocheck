function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const warriorIdleImages = importAll(require.context('@/assets/char/enemy/warrior/idle/', false, /idle\d+\.png$/));
const warriorDeadImages = importAll(require.context('@/assets/char/enemy/warrior/dead/', false, /dead\d+\.png$/));
const warriorWalkImages = importAll(require.context('@/assets/char/enemy/warrior/walk/', false, /walk\d+\.png$/));
const warriorRunImages = importAll(require.context('@/assets/char/enemy/warrior/run/', false, /run\d+\.png$/));
const warriorJumpImages = importAll(require.context('@/assets/char/enemy/warrior/jump/', false, /jump\d+\.png$/));
const warriorAttackImages = importAll(require.context('@/assets/char/enemy/warrior/attack/', false, /attack\d+\.png$/));
const warriorAttack2Images = importAll(require.context('@/assets/char/enemy/warrior/attack2/', false, /attack2\d+\.png$/));
const warriorAttack3Images = importAll(require.context('@/assets/char/enemy/warrior/attack3/', false, /attack3\d+\.png$/));

const WarriorAnimations = {
    idle: warriorIdleImages,
    dead: warriorDeadImages,
    walk: warriorWalkImages,
    run: warriorRunImages,
    jump: warriorJumpImages,
    attack: warriorAttackImages,
    attack2: warriorAttack2Images,
    attack3: warriorAttack3Images,
};

export { WarriorAnimations };
/* eslint-enable */
