import { FillOrderABI } from '../constants/ABI';
import { ethers } from 'ethers';
import { AUGUSTUS_ADDRESS } from '../constants/order';

const provider = new ethers.providers.Web3Provider(window.ethereum);


export const fillOrder = async (order, signature) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(AUGUSTUS_ADDRESS, FillOrderABI, signer);
    return contract.fillOrder(order, signature)
}