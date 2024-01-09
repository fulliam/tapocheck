function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const swordsmanIdleImages = importAll(require.context('@/assets/char/ally/swordsman/idle/', false, /idle\d+\.png$/));
const swordsmanDeadImages = importAll(require.context('@/assets/char/ally/swordsman/dead/', false, /dead\d+\.png$/));
const swordsmanWalkImages = importAll(require.context('@/assets/char/ally/swordsman/walk/', false, /walk\d+\.png$/));
const swordsmanRunImages = importAll(require.context('@/assets/char/ally/swordsman/run/', false, /run\d+\.png$/));
const swordsmanJumpImages = importAll(require.context('@/assets/char/ally/swordsman/jump/', false, /jump\d+\.png$/));
const swordsmanAttackImages = importAll(require.context('@/assets/char/ally/swordsman/attack/', false, /attack\d+\.png$/));
const swordsmanAttack2Images = importAll(require.context('@/assets/char/ally/swordsman/attack2/', false, /attack2\d+\.png$/));
const swordsmanAttack3Images = importAll(require.context('@/assets/char/ally/swordsman/attack3/', false, /attack3\d+\.png$/));

const SwordsmanAnimations = {
    idle: swordsmanIdleImages,
    dead: swordsmanDeadImages,
    walk: swordsmanWalkImages,
    run: swordsmanRunImages,
    jump: swordsmanJumpImages,
    attack: swordsmanAttackImages,
    attack2: swordsmanAttack2Images,
    attack3: swordsmanAttack3Images,
};

export { SwordsmanAnimations };
/* eslint-enable */
