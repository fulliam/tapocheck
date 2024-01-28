function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const orcBerserkIdleImages = importAll(require.context('@/assets/char/enemy/orcs/berserk/idle/', false, /idle\d+\.png$/));
const orcBerserkDeadImages = importAll(require.context('@/assets/char/enemy/orcs/berserk/dead/', false, /dead\d+\.png$/));
const orcBerserkWalkImages = importAll(require.context('@/assets/char/enemy/orcs/berserk/walk/', false, /walk\d+\.png$/));
const orcBerserkRunImages = importAll(require.context('@/assets/char/enemy/orcs/berserk/run/', false, /run\d+\.png$/));
const orcBerserkAttackImages = importAll(require.context('@/assets/char/enemy/orcs/berserk/attack/', false, /attack\d+\.png$/));
const orcBerserkAttack2Images = importAll(require.context('@/assets/char/enemy/orcs/berserk/attack2/', false, /attack2\d+\.png$/));

const orcBerserkAnimations = {
    idle: orcBerserkIdleImages,
    dead: orcBerserkDeadImages,
    walk: orcBerserkWalkImages,
    run: orcBerserkRunImages,
    attack: orcBerserkAttackImages,
    attack2: orcBerserkAttack2Images,
};

export { orcBerserkAnimations };
/* eslint-enable */
