"use client";

import { Spinner } from "@/components/Spinner";
import { useConvex, useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "./_components/Navbar";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
        <Navbar />
        <main className="flex-1 h-full overflow-y-auto">
            {children}
        </main>
    </div>
  );
};

export default PlatformLayout;
