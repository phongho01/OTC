import {
  constructSimpleSDK,
  constructPartialSDK,
  constructEthersContractCaller,
  constructAxiosFetcher,
  // limitOrders methods
  constructBuildLimitOrder,
  constructSignLimitOrder,
  constructPostLimitOrder,
} from '@paraswap/sdk'
import { ethers } from 'ethers'
import axios from 'axios'

const paraSwapMin = constructSimpleSDK({ chainId: 1, axios })
const fetcher = constructAxiosFetcher(axios)

export const getPrice = async (from, to, amount) => {
  const priceRoute = await paraSwapMin.swap.getRate({
    srcToken: from,
    destToken: to,
    amount: amount,
    network: 1,
  })

  const denominator = 10 ** (priceRoute.destAmount > 10 ** 18 ? 2 : 4);

  return Math.floor((priceRoute.destAmount * denominator) / 10 ** 18 ) / denominator
}

export const createOrderStructure = async ({
  maker,
  makerAsset,
  takerAsset,
  makerAmount,
  takerAmount,
  expiry,
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contractCaller = constructEthersContractCaller(
    {
      ethersProviderOrSigner: provider,
      EthersContract: ethers.Contract,
    },
    maker
  )

  const paraSwapLimitOrderSDK = constructPartialSDK(
    {
      chainId: 1,
      fetcher,
      contractCaller,
    },
    constructBuildLimitOrder,
    constructSignLimitOrder,
    constructPostLimitOrder
  )

  const orderInput = {
    nonce: 1,
    expiry: Math.floor(Date.now() / 1000) + expiry,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    maker,
  }

  const signableOrderData = await paraSwapLimitOrderSDK.buildLimitOrder(
    orderInput
  )

  return signableOrderData;

  // const signature = await paraSwapLimitOrderSDK.signLimitOrder(
  //   signableOrderData
  // )

  // const orderToPostToApi = {
  //   ...signableOrderData.data,
  //   signature,
  // }

  // const newOrder = await paraSwapLimitOrderSDK.postLimitOrder(orderToPostToApi)
  // console.log(newOrder)
}
