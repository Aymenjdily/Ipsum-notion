"use client";

import React, { useEffect } from "react";
import SettingsModal from "@/components/SettingsModal";

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
    </>
  );
};

export default ModalProvider;
