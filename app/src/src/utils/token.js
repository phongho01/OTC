import { ethers } from 'ethers';

export const formatUnits = (value) => {
    return ethers.formatUnits(value.toString(), 18);
}