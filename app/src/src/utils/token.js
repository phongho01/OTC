import { ethers } from 'ethers';

export const formatUnits = (value) => {
    return ethers.utils.formatUnits(value.toString(), 18);
}