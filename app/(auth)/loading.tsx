import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-white/70 z-20">
      <Image src="/assets/loader.svg" alt="Loading" width={200} height={200} />
    </div>
  );
}
