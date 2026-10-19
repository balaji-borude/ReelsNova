import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatDetailsDrawer } from "./ChatDetailsDrawer";
import { NewMessageModal } from "./NewMessageModal";
import { EmptyChatState } from "./EmptyChatState";
import {
  initialConversations,
  initialMessagesMap,
  currentUser,
} from "./mockData";
import type { Conversation, MessageItem, SharedReel, ChatUser } from "./types";

const Message: React.FC = () => {
  const { id: paramId } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messagesMap, setMessagesMap] =
    useState<Record<string, MessageItem[]>>(initialMessagesMap);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(() => {
    if (paramId) return paramId;
    // On desktop, default to the first conversation
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return initialConversations[0]?.id || null;
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "online">("all");
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync paramId when URL changes
  useEffect(() => {
    if (paramId && paramId !== activeConversationId) {
      setActiveConversationId(paramId);
    }
  }, [paramId]);

  // Active conversation object
  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );
  const activeMessages = activeConversationId
    ? messagesMap[activeConversationId] || []
    : [];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length, activeConversationId]);

  // Select conversation & clear unread
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Send text message
  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;

    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      receiverId: activeConversation?.participant.id || "other",
      text,
      type: "text",
      timestamp: "Just now",
      status: "sent",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: newMessage,
              updatedAt: "Just now",
            }
          : c
      )
    );
  };

  // Send shared reel
  const handleSendReel = (reel: SharedReel) => {
    if (!activeConversationId) return;

    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      receiverId: activeConversation?.participant.id || "other",
      type: "reel",
      reelData: reel,
      timestamp: "Just now",
      status: "sent",
      text: `Sent a Reel from @${reel.author}`,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: newMessage,
              updatedAt: "Just now",
            }
          : c
      )
    );
  };

  // Send photo
  const handleSendImage = (imageUrl: string) => {
    if (!activeConversationId) return;

    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      receiverId: activeConversation?.participant.id || "other",
      type: "image",
      mediaUrl: imageUrl,
      timestamp: "Just now",
      status: "sent",
      text: "Sent a photo",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: newMessage,
              updatedAt: "Just now",
            }
          : c
      )
    );
  };

  // Send voice note
  const handleSendAudio = (duration: string) => {
    if (!activeConversationId) return;

    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      receiverId: activeConversation?.participant.id || "other",
      type: "audio",
      audioDuration: duration,
      audioWaveform: [30, 45, 60, 80, 50, 70, 90, 40, 65, 85, 75, 55, 95, 60, 45],
      timestamp: "Just now",
      status: "sent",
      text: "Voice note",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: newMessage,
              updatedAt: "Just now",
            }
          : c
      )
    );
  };

  // Add emoji reaction
  const handleReact = (messageId: string, emoji: string) => {
    if (!activeConversationId) return;

    setMessagesMap((prev) => {
      const currentList = prev[activeConversationId] || [];
      const updated = currentList.map((m) => {
        if (m.id !== messageId) return m;

        const reactions = m.reactions ? [...m.reactions] : [];
        const existingReactionIndex = reactions.findIndex(
          (r) => r.emoji === emoji
        );

        if (existingReactionIndex > -1) {
          const react = reactions[existingReactionIndex];
          if (react.users.includes("you")) {
            // Remove reaction
            const newUsers = react.users.filter((u) => u !== "you");
            if (newUsers.length === 0) {
              reactions.splice(existingReactionIndex, 1);
            } else {
              reactions[existingReactionIndex] = {
                ...react,
                count: react.count - 1,
                users: newUsers,
              };
            }
          } else {
            // Add you
            reactions[existingReactionIndex] = {
              ...react,
              count: react.count + 1,
              users: [...react.users, "you"],
            };
          }
        } else {
          reactions.push({ emoji, count: 1, users: ["you"] });
        }

        return { ...m, reactions };
      });

      return { ...prev, [activeConversationId]: updated };
    });
  };

  // Start new chat with user from modal
  const handleSelectUserFromModal = (user: ChatUser) => {
    const existing = conversations.find((c) => c.participant.id === user.id);
    if (existing) {
      handleSelectConversation(existing.id);
    } else {
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        participant: user,
        unreadCount: 0,
        updatedAt: "Just now",
        lastMessage: {
          id: `msg-${Date.now()}`,
          conversationId: newConvId,
          senderId: currentUser.id,
          receiverId: user.id,
          text: `Started a conversation with ${user.fullName}`,
          type: "text",
          timestamp: "Just now",
          status: "read",
        },
      };

      setConversations((prev) => [newConv, ...prev]);
      setMessagesMap((prev) => ({
        ...prev,
        [newConvId]: [newConv.lastMessage],
      }));
      handleSelectConversation(newConvId);
    }
  };

  // Delete chat
  const handleDeleteChat = () => {
    if (!activeConversationId) return;
    setConversations((prev) => prev.filter((c) => c.id !== activeConversationId));
    setActiveConversationId(null);
    setIsDetailsDrawerOpen(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex bg-neutral-950 overflow-hidden select-none">
      {/* 1. SIDEBAR (Hidden on mobile if a conversation is active) */}
      <div
        className={`${
          activeConversationId ? "hidden md:flex" : "flex"
        } w-full md:w-auto h-full shrink-0`}
      >
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewMessage={() => setIsNewMessageModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* 2. MAIN CHAT AREA (Hidden on mobile if no conversation is active) */}
      <div
        className={`${
          !activeConversationId ? "hidden md:flex" : "flex"
        } flex-1 h-full flex-col min-w-0 bg-neutral-950 relative`}
      >
        {activeConversation ? (
          <>
            {/* Header */}
            <ChatHeader
              user={activeConversation.participant}
              onBackMobile={() => setActiveConversationId(null)}
              onToggleInfoDrawer={() =>
                setIsDetailsDrawerOpen(!isDetailsDrawerOpen)
              }
              isInfoDrawerOpen={isDetailsDrawerOpen}
            />

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-2">
              {/* Date Header Pill */}
              <div className="flex items-center justify-center my-4">
                <span className="text-[11px] font-medium text-neutral-500 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
                  Today
                </span>
              </div>

              {/* Chat Thread */}
              {activeMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isMe={msg.senderId === currentUser.id}
                  senderAvatar={activeConversation.participant.avatar}
                  onReact={handleReact}
                  onOpenReel={() => {
                    navigate("/feed");
                  }}
                />
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <MessageInput
              onSendMessage={handleSendMessage}
              onSendReel={handleSendReel}
              onSendImage={handleSendImage}
              onSendAudio={handleSendAudio}
            />
          </>
        ) : (
          <EmptyChatState onNewMessage={() => setIsNewMessageModalOpen(true)} />
        )}
      </div>

      {/* 3. DETAILS DRAWER (Slideout on desktop/tablet) */}
      {activeConversation && isDetailsDrawerOpen && (
        <ChatDetailsDrawer
          user={activeConversation.participant}
          messages={activeMessages}
          isOpen={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          onDeleteChat={handleDeleteChat}
        />
      )}

      {/* 4. NEW MESSAGE MODAL */}
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
        onSelectUser={handleSelectUserFromModal}
      />
    </div>
  );
};

export default Message;