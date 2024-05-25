"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCover } from "@/hooks/use-Cover";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  const coverImage = useCover();
  const removeCover = useMutation(api.documents.removeCover);
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const handleRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCover({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image src={url} alt="Cover-Image" fill className="object-cover" />
      )}
      {url && !preview && (
        <div className=" opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={handleRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;


Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}