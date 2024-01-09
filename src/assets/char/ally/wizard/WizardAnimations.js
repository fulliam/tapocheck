function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const wizardIdleImages = importAll(require.context('@/assets/char/ally/wizard/idle/', false, /idle\d+\.png$/));
const wizardDeadImages = importAll(require.context('@/assets/char/ally/wizard/dead/', false, /dead\d+\.png$/));
const wizardWalkImages = importAll(require.context('@/assets/char/ally/wizard/walk/', false, /walk\d+\.png$/));
const wizardRunImages = importAll(require.context('@/assets/char/ally/wizard/run/', false, /run\d+\.png$/));
const wizardJumpImages = importAll(require.context('@/assets/char/ally/wizard/jump/', false, /jump\d+\.png$/));
const wizardAttackImages = importAll(require.context('@/assets/char/ally/wizard/attack/', false, /attack\d+\.png$/));
const wizardAttack2Images = importAll(require.context('@/assets/char/ally/wizard/attack2/', false, /attack2\d+\.png$/));
const wizardAttack3Images = importAll(require.context('@/assets/char/ally/wizard/attack3/', false, /attack3\d+\.png$/));

const WizardAnimations = {
    idle: wizardIdleImages,
    dead: wizardDeadImages,
    walk: wizardWalkImages,
    run: wizardRunImages,
    jump: wizardJumpImages,
    attack: wizardAttackImages,
    attack2: wizardAttack2Images,
    attack3: wizardAttack3Images,
};

export { WizardAnimations };
/* eslint-enable */
