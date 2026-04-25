'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface PostCardProps {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  onLike?: () => void;
}

export function PostCard({
  id,
  author,
  avatar,
  content,
  timestamp,
  likes,
  onLike,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.();
  };

  return (
    <div className="bg-card rounded-lg shadow-md border border-accent p-5 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <span className="font-bold text-primary text-sm">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <p className="font-bold text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-foreground mb-4 leading-relaxed">{content}</p>

      {/* Actions */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${
          isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-primary'
        }`}
      >
        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>
    </div>
  );
}
