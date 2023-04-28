export const getRandomInt = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export const sanitizeOrderData = ({ nonceAndMeta, expiry, makerAsset, takerAsset, maker, taker, makerAmount, takerAmount }) => {
  return {
    nonceAndMeta,
    expiry,
    makerAsset,
    takerAsset,
    maker,
    taker,
    makerAmount,
    takerAmount,
  };
};
