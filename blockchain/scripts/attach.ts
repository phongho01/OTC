import { ethers, run } from 'hardhat';

async function main() {
    console.log('========DEPLOY===========');
    const accounts = await ethers.getSigners();
    // const ChonkSociety = await ethers.getContractFactory('ChonkSociety');
    // const chonkSociety = await ChonkSociety.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');

    // await chonkSociety.connect(accounts[0]).mint(accounts[0].address, 7);
    // console.log(await chonkSociety.tokensOfOwner(accounts[0].address));

    const WXCR_Factory = await ethers.getContractFactory('WXCR');
    const wXCR = WXCR_Factory.attach('0x747ae7Dcf3Ea10D242bd17bA5dfA034ca6102108');
    // console.log(await wXCR.balanceOf(accounts[0].address));
    const tx = await wXCR.connect(accounts[0]).mint('0x77B6ddbA6AfB1A74979011a07d078Be28f8bF835', ethers.utils.parseUnits('30', 18))
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
