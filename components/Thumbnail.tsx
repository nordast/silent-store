import React from "react";
import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";
import styles from "./styles/Thumbnail.module.css";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure className={cn(styles.thumbnail, className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="Thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && styles.image,
        )}
      />
    </figure>
  );
};

export default Thumbnail;
