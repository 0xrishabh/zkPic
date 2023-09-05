import { decompressSync } from "fflate";
import {
  Crs,
  newBarretenbergApiAsync,
  RawBuffer,
} from "@aztec/bb.js/dest/browser/index.js";
import initACVM, { executeCircuit, compressWitness } from "@noir-lang/acvm_js";
import { ethers } from "ethers";
import circuit from "../../circuits/target/ZKpic.json";

export async function grayScale(inputData: any) {
  console.log("inputData", inputData);
  
  const acirBuffer = Buffer.from(circuit.bytecode, "base64");
  const acirBufferUncompressed = decompressSync(acirBuffer);

  await initACVM();
  const api = await newBarretenbergApiAsync(4);
  const data = await api.acirGetCircuitSizes(
    acirBufferUncompressed
  );
  
  console.log("===============", data);
  
  // const subgroupSize = Math.pow(2, Math.ceil(Math.log2(12)));
  // const crs = await Crs.new(subgroupSize + 1);
  // await api.commonInitSlabAllocator(subgroupSize);
  // await api.srsInitSrs(
  //   new RawBuffer(crs.getG1Data()),
  //   crs.numPoints,
  //   new RawBuffer(crs.getG2Data())
  // );

  // const acirComposer = await api.acirNewAcirComposer(subgroupSize);
  // console.log("acirComposer", acirComposer);
  

  function buf2hex(buffer: any) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
  }

  async function generateWitness(
    input: any,
    acirBuffer: Buffer
  ): Promise<Uint8Array> {
    const initialWitness = new Map<number, string>();
    const bufferDataX = new Uint8Array(input.x).buffer;
    const inputx = buf2hex(bufferDataX)
    const bufferDataY = new Uint8Array(input.y).buffer;
    const inputY = buf2hex(bufferDataY)
    
    initialWitness.set(
      1,
      ethers.utils.hexZeroPad(`0x${inputx}`, 32)
    );
    initialWitness.set(
      2,
      ethers.utils.hexZeroPad(`0x${inputY}`, 32)
    );
    // initialWitness.set(3, ethers.utils.hexZeroPad(`0x${input.z.toString(16)}`, 32));

    const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
      throw Error("unexpected oracle");
    });

    const witnessBuff = compressWitness(witnessMap);
    console.log("witnessBuff", witnessBuff);
    
    return witnessBuff;
  }

  // async function generateProof(witness: Uint8Array) {
  //   const proof = await api.acirCreateProof(
  //     acirComposer,
  //     acirBufferUncompressed,
  //     decompressSync(witness),
  //     false
  //   );
  //   return proof;
  // }

  // async function verifyProof(proof: Uint8Array) {
  //   await api.acirInitProvingKey(acirComposer, acirBufferUncompressed);
  //   const verified = await api.acirVerifyProof(acirComposer, proof, false);
  //   console.log("verified", verified);
  //   return verified;
  // }

  const input = { x: [0, 1, 2], y: [2, 5, 6] };
  const witness = await generateWitness(input, acirBuffer);
  console.log("Witness generated!");
  // const proof = await generateProof(witness);
  // console.log("Proof generated!");
  // await verifyProof(proof);
  console.log("Proof verified!");
  alert("Proof Verified");

  api.destroy();
}
