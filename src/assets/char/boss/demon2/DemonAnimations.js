function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const deadImages = importAll(require.context('@/assets/char/boss/demon2/dead/', false, /dead\d+\.png$/));
const walkImages = importAll(require.context('@/assets/char/boss/demon2/walk/', false, /walk\d+\.png$/));
const idleImages = importAll(require.context('@/assets/char/boss/demon2/idle/', false, /idle\d+\.png$/));
const attackImages = importAll(require.context('@/assets/char/boss/demon2/attack/', false, /attack\d+\.png$/));

const DemonAnimations = {
    dead: deadImages,
    walk: walkImages,
    idle: idleImages,
    attack: attackImages,
};

export { DemonAnimations };
/* eslint-enaable */
