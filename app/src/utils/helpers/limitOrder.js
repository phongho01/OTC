import { getRandomInt, sanitizeOrderData } from '../misc';
import { AUGUSTUS_ADDRESS, CHAIN_ID, ORDER_TYPE, AUGUSTUS_NAME } from '../../constants/order';
import { ethers } from 'ethers';
import { hexValue, hexZeroPad } from '@ethersproject/bytes';

const ZERO_ADDRESS = ethers.constants.AddressZero;

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
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const account = (await provider.listAccounts())[0];
  const signer = provider.getSigner(account);

  const signature = await signer._signTypedData(domain, types, data);
  return signature;
};

export const calculateOrderHash = async ({ domain, types, data }) => {
  return ethers.utils._TypedDataEncoder.hash(domain, types, data);
};
