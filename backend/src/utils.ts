export function currentDateAsUTCString(): string {
    return new Date(Date.now()).toISOString();
}

/**
 * <p>Credits to https://stackoverflow.com/a/64383436</p>
 * Used to round both strings and numbers with the given decimals
 * <p>Examples for 2 decimals:</p>
 *      <p>14 = "14.00"</p>
 *      <p>"14" = "14.00"</p>
 *      <p>"14.555"= "14.56"</p>
 * @param value value to be rounded
 * @param decimal number of decimal places (default = 2)
 *
 * @returns rounded value to given decimals as string
 */
export function setDecimalPlaces(
    value: string | number,
    decimal: number = 2
): string {
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    const precision = 10 ** decimal;
    const n = value * precision * (1 + Number.EPSILON);
    const roundedNumber = Math.round(n) / precision;
    return roundedNumber.toFixed(decimal);
}

/**
 * Arithmetic sum of both values with 2 decimal precision
 * @param first
 * @param second
 *
 * @returns sum as string
 */
export function addValues(
    first: string | number,
    second: string | number
): string {
    first = setDecimalPlaces(first);
    second = setDecimalPlaces(second);
    return setDecimalPlaces(parseFloat(first) + parseFloat(second));
}
