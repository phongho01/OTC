import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { AugustusRFQ, AugustusSwapper, DAI, WETH } from '../typechain-types';

let augustusRFQ: AugustusRFQ;
let augustusSwapper: AugustusSwapper;
let dai: DAI;
let weth: WETH;
let accounts: SignerWithAddress[];
let deployer: SignerWithAddress;
let maker: SignerWithAddress;
let taker: SignerWithAddress;


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
    dai = await DAI.deploy(ethers.utils.parseUnits('1000000', 18));
    await dai.deployed();

    const WETH = await ethers.getContractFactory('WETH');
    weth = await WETH.deploy(ethers.utils.parseUnits('100', 18));
    await weth.deployed();
  });

  it('Testing fill order', async () => {
    console.log(augustusRFQ.address)
    console.log(augustusSwapper.address)
    console.log(dai.address)
    console.log(weth.address)
  })
});
