import { FillOrderABI } from '../constants/ABI';
import { ethers } from 'ethers';
import { AUGUSTUS_ADDRESS } from '../constants/order';

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner();
const contract = new ethers.Contract(AUGUSTUS_ADDRESS, FillOrderABI, signer);

export const fillOrder = async (order, signature) => {
    return contract.fillOrder(order, signature)
}

export const cancelOrder = async (order) => {
    return contract.cancelOrder(order);
}