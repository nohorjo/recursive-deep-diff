# Recursively diff objects and arrays

## Usage
```javascript
const diff = require('recursive-deep-diff');

const a = {
    a: 1,
    b: {
        c: 2,
        d: 4
    },
    e: [
        5,
        9,
        {
            f: 6,
            g: 7
        }
    ],
    h: 8
};

const b = {
    a: 9,
    b: {
        c: 8
    },
    e: [
        7,
        9,
        {
            f: 5
        }
    ],
    h: 8
};

const diffs = diff(a, b);

// diffs:
// {
//     a: 9,
//     b: {
//         c: 8,
//         d: undefined
//     },
//     e: [
//         7,
//         undefined,
//         {
//             f: 5,
//             g: undefined
//         }
//     ]
// }

```
