import { decompressSync } from "fflate";
import {
  Crs,
  newBarretenbergApiAsync,
  RawBuffer,
} from "@aztec/bb.js/dest/browser/index.js";
import initACVM, { executeCircuit, compressWitness } from "@noir-lang/acvm_js";
import { ethers } from "ethers";

export async function grayScale(imageData: any) {
    console.log("imageData", imageData);
}
