"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, siteName } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTING } from "@/app/routing.js";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import styles from "./styles/Sidebar.module.css";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const classesItemActive = styles.itemActive;

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href={ROUTING.home}>
        <Image
          src="/assets/logo-full-brand.svg"
          alt={siteName}
          width={225}
          height={60}
          priority={false}
          className="h-auto hidden lg:block"
        />
        <Image
          src="/assets/logo-brand.svg"
          alt={siteName}
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className={styles.nav}>
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ name, icon, url }) => (
            <Link key={name} href={url} className="lg:w-full" title={name}>
              <li
                className={cn(
                  styles.item,
                  pathname === url && styles.itemActive,
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    styles.icon,
                    pathname === url && styles.iconActive,
                  )}
                />
                <div className="hidden lg:block">{name}</div>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="Files"
        width={506}
        height={418}
        className="w-full"
      />

      <div className={styles.info}>
        <div className="hidden lg:block overflow-hidden">
          <p className="subtitle-2 capitalize line-clamp-1">{fullName}</p>
          <p className="caption">{email}</p>
        </div>

        <Button
          type="submit"
          className="primary-btn flex-shrink-0 shadow-drop-2"
          onClick={async () => await signOutUser()}
        >
          <Image
            src="/assets/icons/logout.svg"
            alt="Logout"
            title="Logout"
            width={24}
            height={24}
          />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
