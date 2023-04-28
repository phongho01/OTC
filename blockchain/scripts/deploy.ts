import { ethers, run } from "hardhat";

async function main() {
  console.log('========DEPLOY===========');
  // const AugustusRFQ = await ethers.getContractFactory("AugustusRFQ");
  // const augustusRFQ = await AugustusRFQ.deploy();
  // await augustusRFQ.deployed();
  // console.log('augustusRFQ', augustusRFQ.address);

  // await run('verify:verify', {
  //   address: augustusRFQ.address,
  //   constructorArguments: []
  // })

  const accounts = await ethers.getSigners();
  
  const AugustusSwapper = await ethers.getContractFactory("AugustusSwapper");
  const augustusSwapper = await AugustusSwapper.deploy(accounts[0].address);
  await augustusSwapper.deployed();
  console.log('augustusSwapper', augustusSwapper.address);

  await run('verify:verify', {
    address: augustusSwapper.address,
    constructorArguments: [accounts[0].address]
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
