function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const orcShamanIdleImages = importAll(require.context('@/assets/char/enemy/orcs/shaman/idle/', false, /idle\d+\.png$/));
const orcShamanDeadImages = importAll(require.context('@/assets/char/enemy/orcs/shaman/dead/', false, /dead\d+\.png$/));
const orcShamanWalkImages = importAll(require.context('@/assets/char/enemy/orcs/shaman/walk/', false, /walk\d+\.png$/));
const orcShamanRunImages = importAll(require.context('@/assets/char/enemy/orcs/shaman/run/', false, /run\d+\.png$/));
const orcShamanAttackImages = importAll(require.context('@/assets/char/enemy/orcs/shaman/attack/', false, /attack\d+\.png$/));
const orcShamanAttack2Images = importAll(require.context('@/assets/char/enemy/orcs/shaman/attack2/', false, /attack2\d+\.png$/));

const orcShamanAnimations = {
    idle: orcShamanIdleImages,
    dead: orcShamanDeadImages,
    walk: orcShamanWalkImages,
    run: orcShamanRunImages,
    attack: orcShamanAttackImages,
    attack2: orcShamanAttack2Images,
};

export { orcShamanAnimations };
/* eslint-enable */
