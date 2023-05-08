import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network } from 'hardhat';
import { AugustusRFQ, AugustusSwapper, DAI, WETH } from '../typechain-types';
import { createOrderStructure, sanitizeOrderData } from './utils';
import { expect } from 'chai'

let augustusRFQ: AugustusRFQ;
let augustusSwapper: AugustusSwapper;
let dai: DAI;
let weth: WETH;
let accounts: SignerWithAddress[];
let deployer: SignerWithAddress;
let maker: SignerWithAddress;
let taker: SignerWithAddress;

const TOKEN_1 = ethers.utils.parseUnits('1', 18);
const TOKEN_100 = ethers.utils.parseUnits('100', 18);
const ONE_DAY = 24 * 60 * 60;

let CHAIN_ID: number;
let AUGUSTUS_ADDRESS: string;
let AUGUSTUS_WRAPPER_TAKER: string;

describe('AugustusRFQ', () => {
  beforeEach(async () => {
    [deployer, maker, taker, ...accounts] = await ethers.getSigners();
    const AugustusRFQ = await ethers.getContractFactory('AugustusRFQ');
    augustusRFQ = await AugustusRFQ.deploy();
    await augustusRFQ.deployed();

    const AugustusSwapper = await ethers.getContractFactory('AugustusSwapper');
    augustusSwapper = await AugustusSwapper.deploy(deployer.address);
    await augustusSwapper.deployed();

    const DAI = await ethers.getContractFactory('DAI');
    dai = await DAI.deploy(TOKEN_100.mul(1000));
    await dai.deployed();

    const WETH = await ethers.getContractFactory('WETH');
    weth = await WETH.deploy(TOKEN_100);
    await weth.deployed();

    await weth.connect(maker).mint(TOKEN_100);
    await dai.connect(taker).mint(TOKEN_100.mul(1000));

    CHAIN_ID = network.config.chainId as number;
    AUGUSTUS_ADDRESS = augustusRFQ.address;
    AUGUSTUS_WRAPPER_TAKER = augustusSwapper.address;
  });

  it('Testing fill order', async () => {
    const args = {
      maker: maker.address,
      makerAsset: weth.address,
      takerAsset: dai.address,
      makerAmount: TOKEN_1,
      takerAmount: TOKEN_100.mul(20),
      expiry: ONE_DAY * 7,
      taker: taker.address,
      CHAIN_ID,
      AUGUSTUS_ADDRESS,
      AUGUSTUS_WRAPPER_TAKER,
    };

    const { signableOrderData, returnedData } = await createOrderStructure(args);
    const typedDataOnly = {
      ...signableOrderData,
      data: sanitizeOrderData(signableOrderData.data),
    };
    const { data, domain, types } = typedDataOnly;
    const provider = ethers.provider;
    const signer = provider.getSigner(maker.address);

    const signature = await signer._signTypedData(domain, types, data);
    returnedData.signature = signature;
    const { signature: makerSignature, orderHash, chainId, takerFromMeta, ...order } = returnedData;
    await weth.connect(maker).approve(augustusRFQ.address, ethers.constants.MaxInt256);
    await dai.connect(taker).approve(augustusRFQ.address, ethers.constants.MaxInt256);
    console.log(order);
    await expect(augustusRFQ.connect(taker).fillOrder(order, signature))
      .to.changeTokenBalances(weth, [maker.address, taker.address], [TOKEN_1.mul(-1), TOKEN_1])
      .to.changeTokenBalances(dai, [maker.address, taker.address], [TOKEN_100.mul(20), TOKEN_100.mul(20).mul(-1)])

  });
});
