// WEBPACK ERROR ???

function importAll(r) {
  return r.keys().map(r);
}

function createAnimations(basePath) {
  return {
    idle: importAll(require.context(`${basePath}idle/`, false, /idle\d+\.png$/)),
    dead: importAll(require.context(`${basePath}dead/`, false, /dead\d+\.png$/)),
    walk: importAll(require.context(`${basePath}walk/`, false, /walk\d+\.png$/)),
    run: importAll(require.context(`${basePath}run/`, false, /run\d+\.png$/)),
    jump: importAll(require.context(`${basePath}jump/`, false, /jump\d+\.png$/)),
    attack: importAll(require.context(`${basePath}attack/`, false, /attack\d+\.png$/)),
    attack2: importAll(require.context(`${basePath}attack2/`, false, /attack2\d+\.png$/)),
    attack3: importAll(require.context(`${basePath}attack3/`, false, /attack3\d+\.png$/)),
  };
}

/* eslint-disable */
const SkeletonAnimations = createAnimations('@/assets/char/ally/skeleton/');
const ArcherAnimations = createAnimations('@/assets/char/ally/archer/');
const SwordsmanAnimations = createAnimations('@/assets/char/ally/swordsman/');
const WizardAnimations = createAnimations('@/assets/char/ally/wizard/');
/* eslint-enable */

export {
  SkeletonAnimations, ArcherAnimations, SwordsmanAnimations, WizardAnimations,
};
