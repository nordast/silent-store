import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <span className={cn("body-1 text-light-100", className)}>
      {formatDateTime(date)}
    </span>
  );
};

export default FormattedDateTime;
