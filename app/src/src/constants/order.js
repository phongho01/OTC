export const AUGUSTUS_ADDRESS = '0xbAce6b869d656407C4BB56E7c00Ae92e7490daE8';

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
