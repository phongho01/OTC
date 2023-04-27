/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { ethers } from 'ethers';

import {
  // swap methods
  constructPartialSDK,
  constructEthersContractCaller,
  constructAxiosFetcher,
  // limitOrders methods
  constructBuildLimitOrder,
  constructSignLimitOrder,
  constructPostLimitOrder,
  // extra types
  SignableOrderData,
  LimitOrderToSend,
} from '@paraswap/sdk';

const account = '0xc8429C05315Ae47FFc0789A201E5F53E93D591D4';

const fetcher = constructAxiosFetcher(axios);

// provider must have write access to account
// this would usually be wallet provider (Metamask)
const provider = ethers.getDefaultProvider(1);
const contractCaller = constructEthersContractCaller(
  {
    ethersProviderOrSigner: provider,
    EthersContract: ethers.Contract,
  },
  account
);

// type BuildLimitOrderFunctions
// & SignLimitOrderFunctions
// & PostLimitOrderFunctions

const paraSwapLimitOrderSDK = constructPartialSDK(
  {
    chainId: 1,
    fetcher,
    contractCaller,
  },
  constructBuildLimitOrder,
  constructSignLimitOrder,
  constructPostLimitOrder
);

const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const HEX = '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39';

const orderInput = {
  nonce: 1,
  expiry: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // week from now, in sec
  makerAsset: DAI,
  takerAsset: HEX,
  makerAmount: (1e18).toString(10),
  takerAmount: (8e18).toString(10),
  maker: account,
};

export const run = async () => {
  const signableOrderData: SignableOrderData =
    await paraSwapLimitOrderSDK.buildLimitOrder(orderInput);

  const signature: string = await paraSwapLimitOrderSDK.signLimitOrder(
    signableOrderData
  );

  const orderToPostToApi: LimitOrderToSend = {
    ...signableOrderData.data,
    signature,
  };

  const newOrder = await paraSwapLimitOrderSDK.postLimitOrder(orderToPostToApi);
  console.log(newOrder);
}
