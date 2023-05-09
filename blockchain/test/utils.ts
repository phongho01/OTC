import { ethers } from 'ethers';
import { hexValue, hexZeroPad } from '@ethersproject/bytes';

const ZERO_ADDRESS = ethers.constants.AddressZero;

export const AUGUSTUS_NAME = 'AUGUSTUS RFQ';

export const ORDER_TYPE = [
  {
    name: 'nonceAndMeta',
    type: 'uint256',
  },
  {
    name: 'expiry',
    type: 'uint128',
  },
  {
    name: 'makerAsset',
    type: 'address',
  },
  {
    name: 'takerAsset',
    type: 'address',
  },
  {
    name: 'maker',
    type: 'address',
  },
  {
    name: 'taker',
    type: 'address',
  },
  {
    name: 'makerAmount',
    type: 'uint256',
  },
  {
    name: 'takerAmount',
    type: 'uint256',
  },
];

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

export const deriveTakerFromNonceAndTaker = (nonceAndMeta) => {
  return hexZeroPad(hexValue(BigInt(nonceAndMeta) & ((BigInt(1) << BigInt(160)) - BigInt(1))), 20);
};

export const buildLimitOrder = ({
  expiry,
  makerAsset,
  takerAsset,
  makerAmount,
  takerAmount,
  maker,
  // if taker is specified -- p2p order for that taker only to fill through Augustus -- taker = Augustus, takerInNonce = _taker
  // if taker is not specified -- limitOrder for anyone to fill through Augustus or not -- taker = Zero, takerInNonce = Zero
  taker: takerInNonce = ZERO_ADDRESS,
  AUGUSTUS_ADDRESS,
  AUGUSTUS_WRAPPER_TAKER,
  CHAIN_ID,
}) => {
  const nonce = getRandomInt();
  const nonceAndMeta = (BigInt(takerInNonce) + (BigInt(nonce) << BigInt(160))).toString(10);
  const taker = takerInNonce === ZERO_ADDRESS ? ZERO_ADDRESS : takerInNonce;

  const order = {
    nonceAndMeta,
    expiry,
    makerAsset,
    takerAsset,
    maker,
    taker,
    makerAmount,
    takerAmount,
  };

  return {
    types: { Order: ORDER_TYPE },
    domain: { name: AUGUSTUS_NAME, version: '1', chainId: CHAIN_ID, verifyingContract: AUGUSTUS_ADDRESS },
    data: order,
  };
};

export const signLimitOrder = async (typedData) => {
  const typedDataOnly = {
    ...typedData,
    data: sanitizeOrderData(typedData.data),
  };
  const { data, domain, types } = typedDataOnly;
  const provider = ethers.provider;
  const signer = provider.getSigner(typedData.data.taker.address);

  const signature = await signer._signTypedData(domain, types, data);
  return signature;
};

export const calculateOrderHash = async ({ domain, types, data }) => {
  return ethers.utils._TypedDataEncoder.hash(domain, types, data);
};

export const createOrderStructure = async ({
  taker,
  maker,
  makerAsset,
  takerAsset,
  makerAmount,
  takerAmount,
  expiry,
  AUGUSTUS_ADDRESS,
  AUGUSTUS_WRAPPER_TAKER,
  CHAIN_ID,
}) => {
  const orderInput = {
    nonce: 1,
    expiry: expiry === 0 ? 0 : Math.floor(Date.now() / 1000) + expiry,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    maker,
    taker,
  };

  const signableOrderData = buildLimitOrder({ ...orderInput, AUGUSTUS_ADDRESS, AUGUSTUS_WRAPPER_TAKER, CHAIN_ID });
  // const signature = await signLimitOrder(signableOrderData);

  const orderHash = await calculateOrderHash(signableOrderData);
  // const orderHash = randomstring.generate(66);
  const takerFromMeta = deriveTakerFromNonceAndTaker(signableOrderData.data.nonceAndMeta);

  signableOrderData.data.makerAmount = signableOrderData.data.makerAmount.toString();
  signableOrderData.data.takerAmount = signableOrderData.data.takerAmount.toString();

  const returnedData = {
    ...signableOrderData.data,
    signature: '',
    orderHash,
    chainId: CHAIN_ID,
    takerFromMeta,
  };
  return {
    signableOrderData,
    returnedData,
  };
};
