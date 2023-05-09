export const ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

export const FillOrderABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'orderHash', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'maker', type: 'address' },
    ],
    name: 'OrderCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'orderHash', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'maker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'makerAsset', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'taker', type: 'address' },
      { indexed: false, internalType: 'address', name: 'takerAsset', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
    ],
    name: 'OrderFilled',
    type: 'event',
  },
  { inputs: [], name: 'FILLED_ORDER', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'RFQ_LIMIT_ORDER_TYPEHASH', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'UNFILLED_ORDER', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
              { internalType: 'uint128', name: 'expiry', type: 'uint128' },
              { internalType: 'address', name: 'makerAsset', type: 'address' },
              { internalType: 'address', name: 'takerAsset', type: 'address' },
              { internalType: 'address', name: 'maker', type: 'address' },
              { internalType: 'address', name: 'taker', type: 'address' },
              { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
            ],
            internalType: 'struct AugustusRFQ.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
          { internalType: 'bytes', name: 'permitTakerAsset', type: 'bytes' },
          { internalType: 'bytes', name: 'permitMakerAsset', type: 'bytes' },
        ],
        internalType: 'struct AugustusRFQ.OrderInfo[]',
        name: 'orderInfos',
        type: 'tuple[]',
      },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'batchFillOrderWithTarget',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'cancelOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'fillOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'fillOrderWithTarget',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      { internalType: 'bytes32[]', name: 'orderHashes', type: 'bytes32[]' },
    ],
    name: 'getRemainingOrderBalance',
    outputs: [{ internalType: 'uint256[]', name: 'remainingBalances', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
    ],
    name: 'partialFillOrder',
    outputs: [{ internalType: 'uint256', name: 'makerTokenFilledAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'partialFillOrderWithTarget',
    outputs: [{ internalType: 'uint256', name: 'makerTokenFilledAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
          { internalType: 'uint128', name: 'expiry', type: 'uint128' },
          { internalType: 'address', name: 'makerAsset', type: 'address' },
          { internalType: 'address', name: 'takerAsset', type: 'address' },
          { internalType: 'address', name: 'maker', type: 'address' },
          { internalType: 'address', name: 'taker', type: 'address' },
          { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
        ],
        internalType: 'struct AugustusRFQ.Order',
        name: 'order',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
      { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bytes', name: 'permitTakerAsset', type: 'bytes' },
      { internalType: 'bytes', name: 'permitMakerAsset', type: 'bytes' },
    ],
    name: 'partialFillOrderWithTargetPermit',
    outputs: [{ internalType: 'uint256', name: 'makerTokenFilledAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'bytes32', name: '', type: 'bytes32' },
    ],
    name: 'remaining',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
              { internalType: 'uint128', name: 'expiry', type: 'uint128' },
              { internalType: 'address', name: 'makerAsset', type: 'address' },
              { internalType: 'address', name: 'takerAsset', type: 'address' },
              { internalType: 'address', name: 'maker', type: 'address' },
              { internalType: 'address', name: 'taker', type: 'address' },
              { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
            ],
            internalType: 'struct AugustusRFQ.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
          { internalType: 'bytes', name: 'permitTakerAsset', type: 'bytes' },
          { internalType: 'bytes', name: 'permitMakerAsset', type: 'bytes' },
        ],
        internalType: 'struct AugustusRFQ.OrderInfo[]',
        name: 'orderInfos',
        type: 'tuple[]',
      },
      { internalType: 'uint256', name: 'makerFillAmount', type: 'uint256' },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'tryBatchFillOrderMakerAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'uint256', name: 'nonceAndMeta', type: 'uint256' },
              { internalType: 'uint128', name: 'expiry', type: 'uint128' },
              { internalType: 'address', name: 'makerAsset', type: 'address' },
              { internalType: 'address', name: 'takerAsset', type: 'address' },
              { internalType: 'address', name: 'maker', type: 'address' },
              { internalType: 'address', name: 'taker', type: 'address' },
              { internalType: 'uint256', name: 'makerAmount', type: 'uint256' },
              { internalType: 'uint256', name: 'takerAmount', type: 'uint256' },
            ],
            internalType: 'struct AugustusRFQ.Order',
            name: 'order',
            type: 'tuple',
          },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'uint256', name: 'takerTokenFillAmount', type: 'uint256' },
          { internalType: 'bytes', name: 'permitTakerAsset', type: 'bytes' },
          { internalType: 'bytes', name: 'permitMakerAsset', type: 'bytes' },
        ],
        internalType: 'struct AugustusRFQ.OrderInfo[]',
        name: 'orderInfos',
        type: 'tuple[]',
      },
      { internalType: 'uint256', name: 'takerFillAmount', type: 'uint256' },
      { internalType: 'address', name: 'target', type: 'address' },
    ],
    name: 'tryBatchFillOrderTakerAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
