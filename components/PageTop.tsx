import React from "react";
import Sort from "@/components/Sort";
import styles from "./styles/PageTop.module.css";

const PageTop = ({ type }: { type: string }) => {
  const totalSize = "0 Mb";

  return (
    <section className="w-full">
      <h1 className="h1 capitalize">{type}</h1>

      <div className={styles.sizeContainer}>
        <p className="body-1 text-light-100">
          Total: <span className="h5">{totalSize}</span>
        </p>

        <div className={styles.sortContainer}>
          <p className="body-1 hidden sm:block text-light-200 text-sm font-medium">
            Sort by:
          </p>
          <Sort />
        </div>
      </div>
    </section>
  );
};

export default PageTop;
