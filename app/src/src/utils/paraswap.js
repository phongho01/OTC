import { constructSimpleSDK } from '@paraswap/sdk';
import { ADDRESS_CONVERTED } from '../constants';
import { CHAIN_ID } from '../constants/order';
import { buildLimitOrder, signLimitOrder, calculateOrderHash, deriveTakerFromNonceAndTaker } from './helpers/limitOrder';
import axios from 'axios';

const paraSwapMin = constructSimpleSDK({ chainId: 1, axios });

export const getPrice = async (from, to, amount) => {
  const priceRoute = await paraSwapMin.swap.getRate({
    srcToken: ADDRESS_CONVERTED[from],
    destToken: ADDRESS_CONVERTED[to],
    amount: amount,
    network: 1,
  });

  const denominator = 10 ** (priceRoute.destAmount > 10 ** 18 ? 2 : 4);

  return Math.floor((priceRoute.destAmount * denominator) / 10 ** 18) / denominator;
};

export const createOrderStructure = async ({ taker, maker, makerAsset, takerAsset, makerAmount, takerAmount, expiry }) => {
  const orderInput = {
    nonce: 1,
    expiry: Math.floor(Date.now() / 1000) + expiry,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    maker,
    taker,
  };

  const signableOrderData = buildLimitOrder(orderInput);

  const signature = await signLimitOrder(signableOrderData);

  const orderHash = await calculateOrderHash(signableOrderData);
  const takerFromMeta = deriveTakerFromNonceAndTaker(signableOrderData.data.nonceAndMeta);

  const returnedData = {
    ...signableOrderData.data,
    signature,
    orderHash,
    chainId: CHAIN_ID,
    takerFromMeta,
  };
  return returnedData;

  // const newOrder = await paraSwapLimitOrderSDK.postLimitOrder(orderToPostToApi)
  // console.log(newOrder)
};
