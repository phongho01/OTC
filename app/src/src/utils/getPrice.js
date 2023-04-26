import { constructSimpleSDK } from '@paraswap/sdk';
import axios from 'axios';

const paraSwapMin = constructSimpleSDK({chainId: 1, axios});

export const getPrice = async (from, to, amount) => {
    const priceRoute = await paraSwapMin.swap.getRate({
      srcToken: from,
      destToken: to,
      amount: amount,
      network: 1,
    });

    return Math.floor(priceRoute.destAmount * 100 / 10 ** 18) / 100;
  }