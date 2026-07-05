import type { LucideIcon } from "lucide-react";

export interface MediaItem {
  id: number;
  media: string;
  likes: number;
  comments: number;
  type: "IMAGE" | "VIDEO";
}

export interface ProfileMediaGridProps {
  data: MediaItem[];
  EmptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
}