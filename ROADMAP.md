# 🚀 Nova - Roadmap

> A Production-Grade Instagram Clone built with React, Node.js, Express, PostgreSQL, Prisma, JWT, Socket.IO and Cloudinary or AWS s3 .

---

# Project Status

- [Completed] Phase 1 - Authentication
- [ ] Phase 2 - User Profile
- [ ] Phase 3 - Feed
- [ ] Phase 4 - Posts
- [ ] Phase 5 - Reels
- [ ] Phase 6 - Search
- [ ] Phase 7 - Notifications
- [ ] Phase 8 - Messaging
- [ ] Phase 9 - Settings
- [ ] Phase 10 - Admin Panel
- [ ] Phase 11 - Performance
- [ ] Phase 12 - Deployment

---

# Phase 1 - Authentication

## Frontend

- [Completed] Login
- [Completed] Logout
- [Complted] Logout
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Email Verification
- [Completed] JWT Authentication
- [Completed] Private Routes
- [Completed] Public Routes
- [ ] Remember Me

## Backend

- [Completed] Register API
- [Completed] Login API
- [ ] Logout API
- [ ] Refresh Token
- [Completed] Password Hashing
- [ ] JWT Middleware
- [ ] Validation
- [ ] Error Handling

## Database

- [ ] User
- [ ] RefreshToken

---

# Phase 2 - User Profile

## Frontend

- [ ] Profile Page
- [ ] Edit Profile
- [ ] Upload Profile Picture
- [ ] Bio
- [ ] Website
- [ ] Followers List
- [ ] Following List

## Backend

- [ ] Get Profile
- [ ] Update Profile
- [ ] Delete Account
- [ ] Upload Avatar API

## Database

- [ ] Profile Table

---

# Phase 3 - Feed

## Features

- [ ] Home Feed
- [ ] Infinite Scroll
- [ ] Suggested Users
- [ ] Feed Pagination
- [ ] Skeleton Loader

## Backend

- [ ] Feed API
- [ ] Pagination
- [ ] Sorting

---

# Phase 4 - Posts

## Features

- [ ] Upload Image
- [ ] Upload Multiple Images
- [ ] Delete Post
- [ ] Edit Caption
- [ ] Like Post
- [ ] Unlike Post
- [ ] Comment
- [ ] Delete Comment
- [ ] Save Post
- [ ] Share Post
- [ ] Report Post

## Backend

- [ ] Upload API
- [ ] Like API
- [ ] Comment API
- [ ] Save API

## Database

- [ ] Post
- [ ] Media
- [ ] Comment
- [ ] Like
- [ ] SavedPost

---

# Phase 5 - Reels

## Features

- [ ] Upload Reel
- [ ] Reel Feed
- [ ] Auto Play
- [ ] Pause
- [ ] Mute
- [ ] Like
- [ ] Comment
- [ ] Share
- [ ] Save Reel
- [ ] View Count

## Backend

- [ ] Upload Reel API
- [ ] Reel Feed API

## Database

- [ ] Reel
- [ ] ReelLike
- [ ] ReelComment

---

# Phase 6 - Search

## Features

- [ ] Search Users
- [ ] Search Posts
- [ ] Search Hashtags
- [ ] Trending Search

## Backend

- [ ] Search API

---

# Phase 7 - Notifications

## Features

- [ ] Like Notification
- [ ] Comment Notification
- [ ] Follow Notification
- [ ] Mention Notification
- [ ] Mark as Read

## Backend

- [ ] Notification API

## Database

- [ ] Notification

---

# Phase 8 - Messaging

## Features

- [ ] Inbox
- [ ] Chat
- [ ] Real-time Messaging
- [ ] Typing Indicator
- [ ] Seen Status
- [ ] Online Status
- [ ] Image Messages

## Backend

- [ ] Socket.IO
- [ ] Chat API

## Database

- [ ] Conversation
- [ ] Message

---

# Phase 9 - Settings

## Features

- [ ] Change Password
- [ ] Change Email
- [ ] Privacy Settings
- [ ] Dark Mode
- [ ] Block Users
- [ ] Delete Account

---

# Phase 10 - Admin

## Features

- [ ] Dashboard
- [ ] User Management
- [ ] Post Management
- [ ] Report Management
- [ ] Analytics

---

# Phase 11 - Performance

- [ ] Redis Cache
- [ ] Lazy Loading
- [ ] Image Optimization
- [ ] Video Streaming
- [ ] Database Indexing
- [ ] Query Optimization
- [ ] Rate Limiting
- [ ] Compression

---

# Phase 12 - Deployment

- [ ] Docker
- [ ] Docker Compose
- [ ] CI/CD
- [ ] Nginx
- [ ] DigitalOcean Deployment
- [ ] PostgreSQL Production
- [ ] Domain Setup
- [ ] HTTPS
- [ ] Monitoring
- [ ] Logging

---

# Database Tables

- [ ] User
- [ ] Profile
- [ ] Post
- [ ] Media
- [ ] Reel
- [ ] ReelLike
- [ ] ReelComment
- [ ] Comment
- [ ] Like
- [ ] SavedPost
- [ ] Follow
- [ ] Notification
- [ ] Conversation
- [ ] ConversationMember
- [ ] Message
- [ ] RefreshToken

---

# API Checklist

## Authentication

- [Completed] POST /auth/signup
- [Completed] POST /auth/login
- [ ] POST /auth/logout
- [ ] POST /auth/refresh

## Users

- [ ] GET /users/:id
- [ ] PATCH /users/:id
- [ ] DELETE /users/:id

## Posts

- [ ] POST /posts
- [ ] GET /posts
- [ ] GET /posts/:id
- [ ] PATCH /posts/:id
- [ ] DELETE /posts/:id

## Likes

- [ ] POST /posts/:id/like
- [ ] DELETE /posts/:id/like

## Comments

- [ ] POST /posts/:id/comments
- [ ] PATCH /comments/:id
- [ ] DELETE /comments/:id

## Reels

- [ ] POST /reels
- [ ] GET /reels

## Follow

- [ ] POST /follow/:id
- [ ] DELETE /follow/:id

## Messages

- [ ] GET /conversations
- [ ] POST /messages

---

# Future Features

- [ ] Stories
- [ ] Story Highlights
- [ ] Bookmarks
- [ ] Draft Posts
- [ ] Archive Posts
- [ ] AI Caption Generator
- [ ] AI Image Moderation
- [ ] Explore Algorithm
- [ ] Trending Hashtags
- [ ] User Verification Badge
- [ ] Live Streaming
- [ ] Video Calls

---

# Bugs

- [ ] None

---

# Improvements

- [ ] Improve UI
- [ ] Improve UX
- [ ] Accessibility
- [ ] SEO
- [ ] Security Audit

---

# Notes

Write ideas, architecture decisions, and future improvements here.