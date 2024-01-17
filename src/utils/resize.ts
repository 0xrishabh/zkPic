import circuit from "../../circuits/resize/target/resize.json";
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

export async function Resize(inputData: any) {
  console.log(inputData)

  const backend = new BarretenbergBackend(circuit as any);
  const noir = new Noir(circuit as any, backend);
  console.log('logs', 'Generating proof... ⌛');
  const proof = noir.generateFinalProof(inputData).then(async (proof) => {
    console.log('logs', 'Generating proof... ✅');
    console.log('results', proof.proof);
    const verification = await noir.verifyFinalProof(proof);
    if (verification) {
      console.log('logs', 'Proof verified! ✅');
    } else {
      console.log("logs", "Proof verification failed")
    }
  }).catch((err) => {
    console.log(err)
  })
  // console.log('logs', 'Generating proof... ✅');
  // console.log('results', proof.proof);
  // const verification = await noir.verifyFinalProof(proof);
  // if (verification) {
  //   console.log('logs', 'Proof verified! ✅');
  // } else {
  //   console.log("logs", "Proof verification failed")
  // }
}
