'use client';

import { Mail, MapPin, Globe, Github, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  bio: string;
  email: string;
  location: string;
  profile_image_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

export function ProfileHeader() {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Tu Nombre',
    bio: 'Estudiante de Ingeniería en Sistemas',
    email: 'tu.email@example.com',
    location: 'Tu Ciudad, País',
    profile_image_url: '/profile.jpg',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="bg-gradient-to-r from-accent to-secondary py-12 animate-pulse" />;
  }

  return (
    <div className="bg-gradient-to-r from-accent to-secondary py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-white shadow-lg overflow-hidden border-4 border-primary flex-shrink-0">
            <Image
              src={profile.profile_image_url || '/profile.jpg'}
              alt={`Foto de perfil de ${profile.name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {profile.name}
            </h1>
            <p className="text-lg text-primary font-semibold mb-4">
              Estudiante de Ingeniería en Sistemas
            </p>
            <p className="text-foreground mb-6 max-w-2xl leading-relaxed">
              {profile.bio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-6">
              {profile.email && (
                <div className="flex items-center gap-2 text-foreground">
                  <Mail size={20} className="text-primary" />
                  <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin size={20} className="text-primary" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
