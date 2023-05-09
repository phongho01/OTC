export const AUGUSTUS_ADDRESS = '0xcC80098d81d377EB9659ad2bAdb99d34E3e9B307';

export const AUGUSTUS_WRAPPER_TAKER = '0xcB34fD4C4eb84D05Ef1cC95177e47E6344B6e74A';

export const AUGUSTUS_NAME = 'AUGUSTUS RFQ';

export const CHAIN_ID = 97;

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

export const ORDER_STATUS = {
  'PENDING': 'PENDING',
  'FULFILLMENT': 'FULFILLMENT',
  'CANCELLATION': 'CANCELLATION',
  'EXPIRATION': 'EXPIRATION',
}

export const WETH_TOKEN = '0x0d1F718A3079d3B695C733BA2a726873A019299a';
export const DAI_TOKEN = '0xF5B217Af5d3c828BDaEE078837b8b22cD2cBe615';