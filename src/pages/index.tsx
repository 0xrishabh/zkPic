import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="relative flex flex-col gap-y-10 place-items-center">
        <p className="text-4xl font-bold">Zk Verification</p>
        <div className="flex gap-x-8">
          <Link href="/gray">
            <p className="border-2 border-black px-4 py-2 rounded-xl cursor-pointer">
              Grayscale
            </p>
          </Link>
          <Link href="/crop">
            <p className="border-2 border-black px-4 py-2 rounded-xl cursor-pointer">
              Crop
            </p>
          </Link>
          <Link href="/resize">
            <p className="border-2 border-black px-4 py-2 rounded-xl cursor-pointer">
              Resize
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
