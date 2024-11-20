import React from "react";
import Image from "next/image";
import { siteName } from "@/constants";
import AuthBackdrop from "@/components/AuthBackdrop";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="p-10 items-center justify-center w-1/2 hidden lg:flex xl:w-2/5 relative">
        <AuthBackdrop />

        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/assets/logo-full.svg"
            alt={siteName}
            width={300}
            height={81}
            className="h-auto"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              Awesome, we've created the perfect place for you to store all your
              documents.
            </p>
          </div>

          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className="tranition-all duration-500 hover:rotate-2 hover:scale-105"
            priority={false}
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/logo-full-brand.svg"
            alt={siteName}
            width={270}
            height={72}
            className="h-auto w-[230px] lg:w-[270px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
