function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const orcWarriorIdleImages = importAll(require.context('@/assets/char/enemy/orcs/warrior/idle/', false, /idle\d+\.png$/));
const orcWarriorDeadImages = importAll(require.context('@/assets/char/enemy/orcs/warrior/dead/', false, /dead\d+\.png$/));
const orcWarriorWalkImages = importAll(require.context('@/assets/char/enemy/orcs/warrior/walk/', false, /walk\d+\.png$/));
const orcWarriorRunImages = importAll(require.context('@/assets/char/enemy/orcs/warrior/run/', false, /run\d+\.png$/));
const orcWarriorAttackImages = importAll(require.context('@/assets/char/enemy/orcs/warrior/attack/', false, /attack\d+\.png$/));
const orcWarriorAttack2Images = importAll(require.context('@/assets/char/enemy/orcs/warrior/attack2/', false, /attack2\d+\.png$/));

const orcWarriorAnimations = {
    idle: orcWarriorIdleImages,
    dead: orcWarriorDeadImages,
    walk: orcWarriorWalkImages,
    run: orcWarriorRunImages,
    attack: orcWarriorAttackImages,
    attack2: orcWarriorAttack2Images,
};

export { orcWarriorAnimations };
/* eslint-enable */
