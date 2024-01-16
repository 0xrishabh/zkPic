import circuit from "../../circuits/gray/target/gray.json";
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

export async function grayScale(inputData: any) {
  const backend = new BarretenbergBackend(circuit as any);
  const noir = new Noir(circuit as any, backend);
  console.log('logs', 'Generating proof... ⌛');
  const input = { orig_image: inputData.RGBImage, gray_image: inputData.GrayImage };
  const proof = await noir.generateFinalProof(input);
  console.log('logs', 'Generating proof... ✅');
  console.log('results', proof.proof);
  const verification = await noir.verifyFinalProof(proof);
  if (verification) {
    console.log('logs', 'Proof verified! ✅');
  }
}
