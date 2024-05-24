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
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "./DropZone";

const CoverModal = () => {
  const coverImage = useCover();
  const [file, setFile] = React.useState<File>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const params = useParams();

  const handleClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const handleChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({
        file,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: response.url,
      });

      handleClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverModal;
