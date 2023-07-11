import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers, network } from 'hardhat';
import { Loan, ChonkSociety, WXCR } from '../typechain-types';
import { getRandomInt } from './utils';
import { expect } from 'chai';

let loan: Loan;
let nft: ChonkSociety;
let wXCR: WXCR;
let accounts: SignerWithAddress[];
let deployer: SignerWithAddress;
let borrower: SignerWithAddress;
let lender: SignerWithAddress;

const TOKEN_1 = ethers.utils.parseUnits('1', 18);
const TOKEN_100 = ethers.utils.parseUnits('100', 18);
const ONE_DAY = 24 * 60 * 60;

describe.only('Loan', () => {
    beforeEach(async () => {
        [deployer, borrower, lender, ...accounts] = await ethers.getSigners();

        const WXCR = await ethers.getContractFactory('WXCR');
        wXCR = await WXCR.deploy();
        await wXCR.deployed();

        const Loan = await ethers.getContractFactory('Loan');
        loan = await Loan.deploy(wXCR.address);
        await wXCR.deployed();

        const NFT = await ethers.getContractFactory('ChonkSociety');
        nft = await NFT.deploy('https://chonksociety.s3.us-east-2.amazonaws.com/metadata/');
        await nft.deployed();

        await wXCR.connect(lender).mint(lender.address, TOKEN_100);
        await nft.connect(borrower).mint(borrower.address, 5);
    });

    it('Testing fill order', async () => {
        const nonce = getRandomInt();
        const nonceAndMeta = (BigInt(nonce) + (BigInt(nonce) << BigInt(160))).toString(10);
        const args = {
            nonceAndMeta,
            borrower: borrower.address,
            lender: lender.address,
            nftCollateralId: 1,
            nftCollateralAddress: nft.address,
            amount: TOKEN_1.mul(12),
            duration: ONE_DAY * 30,
            rate: 2145,
        };

        const provider = ethers.provider;
        const signer = provider.getSigner(borrower.address);
        const offerHash = await loan.getOfferHash(args);
        const signature = await signer._legacySignMessage(offerHash);
        console.log('borrower', borrower.address);
        console.log('lender', lender.address);

        await expect(loan.connect(borrower).acceptOffer(args, signature)).to.emit(loan, 'AcceptedOffer');
    });
});
