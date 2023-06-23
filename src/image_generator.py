'''
[DEMO-ONLY]
This script generates data for the circuit.
'''


import sys
n = int(sys.argv[1])
output = {}
orig = []
gray = []
negativeRemainder = []
positiveRemainder = []
for _ in range(0, n ):
    orig.append([150, 93, 200])
    orig.append([45, 239, 97])

    gray.append(122)
    gray.append(165)

    negativeRemainder.append(13)
    negativeRemainder.append(0)

    positiveRemainder.append(0)
    positiveRemainder.append(18)


output["original"] = orig
output["gray"] = gray
output["negativeRemainder"] = negativeRemainder
output["positiveRemainder"] = positiveRemainder    

print(output)