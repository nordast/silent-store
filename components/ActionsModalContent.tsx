import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./styles/ActionsModalContent.module.css";
import { Copy } from "lucide-react";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className={styles.detailsThumbnail}>
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="subtitle-2 mb-1">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className="caption" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className={styles.detailsLabel}>{label}</p>
    <p className={styles.detailsValue}>{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2 pb-8">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
  onCopyClick: (url: string) => void;
}

export const ShareInput = ({
  file,
  onInputChange,
  onRemove,
  onCopyClick,
}: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className={styles.shareContainer}>
        <div className="subtitle-2 pl-1 text-light-100">
          Direct URL to file:
          <div className="flex space-x-2 items-center justify-between h-[52px]">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="File Url"
                defaultValue={file.url}
                disabled={true}
                className="share-input"
              />
            </div>
            <div className="w-[52px]">
              <Button
                type="submit"
                className="bg-brand hover:bg-brand-100 transition-all mt-2 !mx-0 h-[48px] !w-[52x] rounded capitalize shadow-drop-2 px-4 py-4 flex"
                onClick={() => onCopyClick(file.url)}
              >
                <Copy />
              </Button>
            </div>
          </div>
        </div>

        <div className="subtitle-2 pl-1 text-light-100">
          Direct URL to file:
          <Input
            type="text"
            placeholder="File Url"
            defaultValue={file.url}
            readOnly={true}
            className="share-input"
            onClick={() => onCopyClick(file.url)}
          />
        </div>

        <div className="subtitle-2 pl-1 pt-5 text-light-100">
          Share file with other users:
          <Input
            type="email"
            placeholder="Enter email address"
            onChange={(e) => onInputChange(e.target.value.trim().split(","))}
            className="share-input"
          />
          <div className="pt-5">
            <div className="flex justify-between">
              <p className="subtitle-2 text-light-100">Shared with users</p>
              <p className="subtitle-2 text-light-200">
                {file.users.length} users
              </p>
            </div>

            {file.users.length > 0 && (
              <ul className="mt-2 rounded-xl border border-light-200/40 bg-light-400/50 p-3">
                {file.users.map((email: string) => (
                  <li
                    key={email}
                    className="flex items-center justify-between gap-2"
                  >
                    <p className="subtitle-2 truncate">{email}</p>

                    <Button
                      onClick={() => onRemove(email)}
                      className={styles.shareRemoveUser}
                    >
                      <Image
                        src="/assets/icons/remove.svg"
                        alt="Remove"
                        width={24}
                        height={24}
                        className={styles.removeIcon}
                      />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
