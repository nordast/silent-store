import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const AppLoader = ({
  src = "/assets/icons/loader.svg",
  size = 24,
  className = "ml-2",
}: {
  src?: string;
  size?: number;
  className?: string;
}) => {
  return (
    <Image
      src={src}
      alt="Loader"
      width={size}
      height={size}
      className={cn("animate-spin", className)}
    />
  );
};

export default AppLoader;
