'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the deck type
type Deck = {
  id: number;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoadingDecks, setIsLoadingDecks] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      console.log('No user found, redirecting to homepage');
      router.push('/');
    }
  }, [isLoaded, user, router]);

  // Fetch user's decks
  useEffect(() => {
    async function fetchDecks() {
      if (!user?.id) return;
      
      try {
        setIsLoadingDecks(true);
        const response = await fetch('/api/decks', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDecks(data.decks || []);
        } else {
          console.error('Failed to fetch decks:', response.statusText);
          setDecks([]);
        }
      } catch (error) {
        console.error('Error fetching decks:', error);
        setDecks([]);
      } finally {
        setIsLoadingDecks(false);
      }
    }

    if (isLoaded && user) {
      fetchDecks();
    }
  }, [isLoaded, user]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated (will happen via useEffect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Flashcard Decks</h1>
        <Button>Create New Deck</Button>
      </div>
      
      {isLoadingDecks ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your decks...</p>
        </div>
      ) : decks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-muted-foreground mb-4">
            No decks yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Create your first flashcard deck to get started learning!
          </p>
          <Button>Create Your First Deck</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <Card key={deck.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-1">{deck.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {deck.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {deck.description}
                  </p>
                )}
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>Created: {new Date(deck.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" className="flex-1">
                    Study
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
