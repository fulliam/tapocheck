function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const deadImages = importAll(require.context('@/assets/char/boss/dragon/dead/', false, /dead\d+\.png$/));
const walkImages = importAll(require.context('@/assets/char/boss/dragon/walk/', false, /walk\d+\.png$/));
const idleImages = importAll(require.context('@/assets/char/boss/dragon/idle/', false, /idle\d+\.png$/));
const attackImages = importAll(require.context('@/assets/char/boss/dragon/attack/', false, /attack\d+\.png$/));

const DragonAnimations = {
    dead: deadImages,
    walk: walkImages,
    idle: idleImages,
    attack: attackImages,
};

export { DragonAnimations };
/* eslint-enaable */
