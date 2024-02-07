# ZKPic

[Using ZK Proofs to Fight Disinformation](https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f)

## Intro

#### Circuits:

There are three circuits:
* *Gray:* Proves an image is a grayscale of the other.
* *Crop:* Proves an image is cropped from the other.
* *Resize:* Proves an image is a resized version of the other.

By default, all the circuits are configured to take images of size (w * h = 4000). 

This can be configured through the *DEPTH* variable in each circuit.

#### Frontend: 

A simple UI allows you to upload images to generate and verify proofs.

For testing, Each folder `circuits/*circuit_name*` has two images to upload and see proofs.

  
### Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

