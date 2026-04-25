'use client';

import { Navbar } from '@/components/navbar';
import { PostCard } from '@/components/post-card';
import { ProfileHeader } from '@/components/profile-header';
import { useLanguage } from '@/lib/language-context';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

export default function Home() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    setPosts([
      {
        id: '1',
        author: 'Kristel Villalta',
        content: t('home.feed.post1'),
        timestamp: t('home.feed.ago2Days'),
        likes: 24,
      },
      {
        id: '2',
        author: 'Kristel Villalta',
        content: t('home.feed.post2'),
        timestamp: t('home.feed.ago5Days'),
        likes: 18,
      },
      {
        id: '3',
        author: 'Kristel Villalta',
        content: t('home.feed.post3'),
        timestamp: t('home.feed.ago1Week'),
        likes: 42,
      },
    ]);
  }, [t]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-white to-background">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Feed Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('home.recentPosts')}</h2>
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    author={post.author}
                    content={post.content}
                    timestamp={post.timestamp}
                    likes={post.likes}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Stats */}
              <div className="bg-card rounded-lg shadow-md border border-accent p-6 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-4">{t('home.stats.title')}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm">{t('home.stats.projects')}</p>
                    <p className="text-3xl font-bold text-primary">8</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">{t('home.stats.semester')}</p>
                    <p className="text-3xl font-bold text-primary">5°</p>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </div>
      </main>
    </>
  );
}
