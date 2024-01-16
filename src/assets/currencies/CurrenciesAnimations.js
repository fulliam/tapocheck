function importAll(r) {
  return r.keys().map(r);
}

/* eslint-disable */
const goldCoinImages = importAll(require.context('@/assets/currencies/coins/gold', false, /goldCoin\d+\.png$/));
const silverCoinImages = importAll(require.context('@/assets/currencies/coins/silver', false, /silverCoin\d+\.png$/));
const redCoinImages = importAll(require.context('@/assets/currencies/coins/red', false, /redCoin\d+\.png$/));

const yellowGemImages = importAll(require.context('@/assets/currencies/gems/yellow', false, /yellowGem\d+\.png$/));
const greenGemImages = importAll(require.context('@/assets/currencies/gems/green', false, /greenGem\d+\.png$/));
const blueGemImages = importAll(require.context('@/assets/currencies/gems/blue', false, /blueGem\d+\.png$/));
const redGemImages = importAll(require.context('@/assets/currencies/gems/red', false, /redGem\d+\.png$/));
const greyGemImages = importAll(require.context('@/assets/currencies/gems/grey', false, /greyGem\d+\.png$/));

const CurrenciesAnimations = {
    coin: {
        gold: goldCoinImages,
        silver: silverCoinImages,
        red: redCoinImages,
    },
    gem: {
        yellow: yellowGemImages,
        green: greenGemImages,
        blue: blueGemImages,
        red: redGemImages,
        grey: greyGemImages,
    },
};

export { CurrenciesAnimations };
/* eslint-enable */
