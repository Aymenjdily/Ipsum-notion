"use client";

import React, { useEffect } from "react";
import SettingsModal from "@/components/SettingsModal";
import CoverModal from "@/components/CoverModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverModal />
    </>
  );
};

export default ModalProvider;
