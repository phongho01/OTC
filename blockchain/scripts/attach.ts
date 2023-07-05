import { ethers, run } from 'hardhat';

async function main() {
    console.log('========DEPLOY===========');
    const accounts = await ethers.getSigners();
    const ChonkSociety = await ethers.getContractFactory('ChonkSociety');
    const chonkSociety = await ChonkSociety.attach('0xF31a2E258BeC65A46fb54cd808294Ce215070150');

    // await chonkSociety.connect(accounts[0]).mint(accounts[0].address, 7);
    console.log(await chonkSociety.tokensOfOwner(accounts[0].address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
