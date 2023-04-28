import { ethers, run } from "hardhat";

async function main() {
  console.log('========DEPLOY===========');
  const accounts = await ethers.getSigners();

  const AugustusRFQ = await ethers.getContractFactory("AugustusRFQ");
  const augustusRFQ = await AugustusRFQ.deploy();
  await augustusRFQ.deployed();
  console.log('augustusRFQ', augustusRFQ.address);
  
  const AugustusSwapper = await ethers.getContractFactory("AugustusSwapper");
  const augustusSwapper = await AugustusSwapper.deploy(accounts[0].address);
  await augustusSwapper.deployed();
  console.log('augustusSwapper', augustusSwapper.address);

  const WETH = await ethers.getContractFactory("WETH");
  const weth = await WETH.deploy(ethers.utils.parseUnits('100', 18));
  await weth.deployed();
  console.log('weth', weth.address);

  const DAI = await ethers.getContractFactory("DAI");
  const dai = await DAI.deploy(ethers.utils.parseUnits('1000000', 18));
  await dai.deployed();
  console.log('dai', dai.address);

  await run('verify:verify', {
    address: augustusRFQ.address,
    constructorArguments: []
  })

  await run('verify:verify', {
    address: augustusSwapper.address,
    constructorArguments: [accounts[0].address]
  });

  await run('verify:verify', {
    address: '0x0d1F718A3079d3B695C733BA2a726873A019299a',
    contract: 'contracts/WETH.sol:WETH',
    constructorArguments: [ethers.utils.parseUnits('100', 18)]
  });

  await run('verify:verify', {
    address: '0xF5B217Af5d3c828BDaEE078837b8b22cD2cBe615',
    contract: 'contracts/DAI.sol:DAI',
    constructorArguments: [ethers.utils.parseUnits('1000000', 18)]
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
