export const ERC20ABI = [
  { inputs: [{ internalType: 'uint256', name: 'initialSupply', type: 'uint256' }], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'burn', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }], name: 'mint', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
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