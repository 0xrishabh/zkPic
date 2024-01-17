import circuit from "../../circuits/crop/target/crop.json";
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

export async function Crop(inputData: any) {
  console.log(inputData)

  const backend = new BarretenbergBackend(circuit as any);
  const noir = new Noir(circuit as any, backend);
  console.log('logs', 'Generating proof... ⌛');
  const proof = await noir.generateFinalProof(inputData);
  console.log('logs', 'Generating proof... ✅');
  console.log('results', proof.proof);
  const verification = await noir.verifyFinalProof(proof);
  if (verification) {
    console.log('logs', 'Proof verified! ✅');
  } else {
    console.log("logs", "Proof verification failed")
  }
}
