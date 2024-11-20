import React from "react";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import styles from "./styles/Header.module.css";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className={styles.root}>
      <Search />
      <div className={styles.container}>
        <FileUploader ownerId={userId} accountId={accountId} />
      </div>
    </header>
  );
};

export default Header;
