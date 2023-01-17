export function currentDateAsUTCString(): string {
    return new Date(Date.now()).toISOString();
}

//Credits to https://stackoverflow.com/a/64383436
export function setDecimalPlaces(value: string | number, decimal: number = 2) {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    const precision = 10 ** decimal;
    const n = value * precision * (1 + Number.EPSILON);
    const roundedNumber = Math.round(n) / precision;
    return roundedNumber.toFixed(decimal);
}

export function addValues(first: string | number, second: string | number) {
    first = setDecimalPlaces(first);
    second = setDecimalPlaces(second);
    return setDecimalPlaces(parseFloat(first) + parseFloat(second));
}
