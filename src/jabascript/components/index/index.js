function sumMax(a, b, c) {
    if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
        return 'Invalid input data'
    }
    if (a * b * c > a + b + c) {
        return a * b * c + 3;
    }
    return a + b + c + 3;
}

module.exports = {sumMax}