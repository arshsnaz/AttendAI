import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface ArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
}

export default function ArticleDialog({ open, onOpenChange, title, content }: ArticleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          <div className="prose max-w-none text-left text-base md:text-lg">
            {content}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
