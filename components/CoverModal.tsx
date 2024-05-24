"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from "./ui/dialog";
import { useCover } from "@/hooks/use-Cover";

const CoverModal = () => {
  const coverImage = useCover();

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>Todo: upload image</div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverModal;
