export const formatNumber = (value, digits = 2) => {
    return Math.floor(value * (10 ** digits)) / (10 ** digits);
}

export const diffPercent = (oldValue, newValue) => {
    const percent = `${formatNumber((newValue - oldValue) * 100 / oldValue, 2)}%`;
    return percent[0] === '-' ? percent : '+' + percent;
}