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

