module.exports = function diff(first, second) {
    if (!first || !second) throw 'first and second cannot be null or undefined';
    if (first.constructor != second.constructor) throw 'Object type mismatch';
    
    const diffs = JSON.parse(JSON.stringify(second));

    switch (first.constructor) {
        case Array:
            first.forEach((value, k) => step(value, k, true));
            break;
        case Object:
            Object.entries(first).forEach(([k, value]) => step(value, k));
            break;
        default: throw 'Can only diff Objects or Arrays';
    }
    
    function step(existing, k, isArrayElement = false) {
        const value = second[k];
        if (existing === undefined && value !== undefined) {
            diffs[k] = value;
        } else if (existing !== undefined && value === undefined) {
            diffs[k] = undefined;
        } else if (existing == value) {
            if (isArrayElement) diffs[k] = undefined;
            else delete diffs[k];
        } else if (
            existing.constructor != value.constructor
            || (existing.constructor != Object && existing.constructor != Array)
        ) {
            diffs[k] = value;
        } else {
            diffs[k] = diff(existing, value);
        }
    }

    return diffs;
}
