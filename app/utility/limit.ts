/**
 * Returns the first `limit` characters from the given `string`.
 *
 * @param {String} string
 * @param {Number} limit
 *
 * @returns {String}
 */
const limit = (string: string = '', limit: number = 0): string => {
    return string.substring(0, limit)
}

export default limit;