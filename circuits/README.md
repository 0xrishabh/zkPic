# Research

GOAL: To convert the [circom circuits](https://github.com/TrishaDatta/circom-circuits) to noir.

Metric: A successful conversion will require all circom's abilities to be present in noir


| Charcteristic | Circom | noir |
| ---           | ---    | ---  |
| Functions     |  ✅    |  ✅  |
| Arrays        |  ✅    |  ✅  |
| Nested Arrays |  ✅    |  ❌  |
| Assertion     |  ✅    |  ✅  |
| Loops         |  ✅    |  ✅  | 
| Variables     |  ✅    |  ✅  |
| Logical Op.   |  ✅    |  ✅  |
| Control Flow  |  ✅    |  ✅  | 
| Dynamic Loops |  ✅    |  ❌  |


# TEST

nargo test --show-output --experimental-ssa


# Design Choice:

* Can't Have nested array for image in main function, as noir does not support nested arrays
* Can't Have array of tuple for image, as noir have not implemented the abi for it
* Can't Have variable length array, as noir does not support that as parameter to main function 
