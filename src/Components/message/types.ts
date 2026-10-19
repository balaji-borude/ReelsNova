export type MessageType = "text" | "reel" | "image" | "audio";

export type MessageStatus = "sent" | "delivered" | "read";

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // usernames of users who reacted
}

export interface SharedReel {
  id: string | number;
  author: string;
  authorAvatar?: string;
  thumbnail: string;
  caption: string;
  likes: string;
  comments?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  type: MessageType;
  timestamp: string; // ISO string or display string like "10:24 AM"
  status: MessageStatus;
  mediaUrl?: string;
  reelData?: SharedReel;
  audioDuration?: string;
  audioWaveform?: number[]; // list of heights (0-100) for waveform
  reactions?: MessageReaction[];
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
}

export interface ChatUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  bio?: string;
  followers?: string;
  following?: string;
  postsCount?: number;
  note?: string; // DM status bubble note
}

export interface Conversation {
  id: string;
  participant: ChatUser;
  lastMessage: MessageItem;
  unreadCount: number;
  isPinned?: boolean;
  isMuted?: boolean;
  updatedAt: string;
}
