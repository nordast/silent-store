import React from "react";
import Link from "next/link";
import Image from "next/image";
import { convertFileSize } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import FormattedDateTime from "@/components/FormattedDateTime";
import styles from "./styles/DashboardSummaries.module.css";

const DashboardSummaries = ({ usageSummary }: any) => {
  return (
    <ul className={styles.container}>
      {usageSummary.map((summary: DashboardSummaryProps) => (
        <Link href={summary.url} key={summary.title} className={styles.card}>
          <div className="space-y-4">
            <div className="flex justify-between gap-3">
              <Image
                src={summary.icon}
                width={100}
                height={100}
                alt="uploaded image"
                className={styles.icon}
              />
              <h4 className={styles.size}>
                {convertFileSize(summary.size) || 0}
              </h4>
            </div>

            <h5 className={styles.title}>{summary.title}</h5>
            <Separator className="bg-light-400" />

            <div className="body-1 mt-10 text-center text-light-200">
              Last update
            </div>

            <div className="text-center">
              <FormattedDateTime date={summary.latestDate} className="" />
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default DashboardSummaries;
