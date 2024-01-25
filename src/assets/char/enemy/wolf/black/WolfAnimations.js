function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const wolfIdleImages = importAll(require.context('@/assets/char/enemy/wolf/black/idle/', false, /idle\d+\.png$/));
const wolfDeadImages = importAll(require.context('@/assets/char/enemy/wolf/black/dead/', false, /dead\d+\.png$/));
const wolfWalkImages = importAll(require.context('@/assets/char/enemy/wolf/black/run/', false, /run\d+\.png$/));
const wolfRunImages = importAll(require.context('@/assets/char/enemy/wolf/black/run/', false, /run\d+\.png$/));
const wolfAttackImages = importAll(require.context('@/assets/char/enemy/wolf/black/attack/', false, /attack\d+\.png$/));
const wolfAttack2Images = importAll(require.context('@/assets/char/enemy/wolf/black/attack/', false, /attack\d+\.png$/));

const WolfAnimations = {
    idle: wolfIdleImages,
    dead: wolfDeadImages,
    walk: wolfWalkImages,
    run: wolfRunImages,
    attack: wolfAttackImages,
    attack2: wolfAttack2Images,
};

export { WolfAnimations };
/* eslint-enable */
