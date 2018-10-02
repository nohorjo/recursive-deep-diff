module.exports = function diff(first, second) {
    if (!first || !second) throw 'first and second cannot be null or undefined';
    if (first.constructor != second.constructor) throw 'Object type mismatch';
    
    const diffs = new first.constructor;

    switch (second.constructor) {
        case Array:
            second.forEach((value, k) => step(value, k, true));
            break;
        case Object:
            Object.entries(second).forEach(([k, value]) => step(value, k));
            break;
        default: throw 'Can only diff Objects or Arrays';
    }
    
    function step(value, k, isArrayElement = false) {
        const existing = first[k];
        if (existing === undefined && value !== undefined) {
            diffs[k] = value;
        } else if (existing !== undefined && value === undefined) {
            // FIXME not working with objects
            diffs[k] = undefined;
        } else if (existing == value) {
            if (isArrayElement) diffs[k] = undefined;
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
