import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image src="/assets/loader.svg" alt="Loading" width={200} height={200} />
    </div>
  );
}
