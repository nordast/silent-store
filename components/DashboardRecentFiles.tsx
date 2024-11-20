import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import ActionDropdown from "@/components/ActionDropdown";
import EmptyMessage from "@/components/EmptyMessage";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import styles from "./styles/DashboardRecentFiles.module.css";

const DashboardRecentFiles = ({ files }: { files: Models.Document[] }) => {
  return (
    <section className={styles.container}>
      <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
      {files.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-5">
          {files.map((file: Models.Document) => (
            <Link
              href={file.url}
              target="_blank"
              className="flex items-center gap-3 relative pr-6"
              key={file.$id}
            >
              <Thumbnail
                type={file.type}
                extension={file.extension}
                url={file.url}
              />

              <div className={styles.details}>
                <div className="flex flex-col gap-1">
                  <p className={styles.name}>{file.name}</p>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className={styles.date}
                  />
                </div>
                <ActionDropdown file={file} />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <EmptyMessage />
      )}
    </section>
  );
};

export default DashboardRecentFiles;
