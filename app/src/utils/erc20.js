import { ERC20ABI } from '../constants/ABI';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

export const balanceOf = async (contractAddress, account) => {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, provider);
    return contract.balanceOf(account);
}

export const getContractSymbol = async (contractAddress) => {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, provider);
    return contract.symbol();
}

export const checkAllowance = async (contractAddress, spender, account, amount) => {
    const contract = new ethers.Contract(contractAddress, ERC20ABI, provider);
    const allowance = await contract.allowance(account, spender);
    return allowance.gte(amount);
}

export const approveERC20 = async (contractAddress, spender, amount = ethers.constants.MaxInt256) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ERC20ABI, signer);
    return contract.approve(spender, ethers.constants.MaxInt256);
}

export const mintToken = async (contractAddress, amount) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ERC20ABI, signer);
    return contract.mint(amount);

}