'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Debug what's happening
  console.log('Homepage client auth check:', { user: !!user, isLoaded });

  // Handle redirect after authentication state is loaded
  useEffect(() => {
    if (isLoaded && user) {
      console.log('User is authenticated, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [isLoaded, user, router]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show loading (redirect will happen via useEffect)
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        {/* Main Heading */}
        <h1 className="text-6xl font-bold">
          FlashyCardy
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-muted-foreground">
          Your personal flashcard platform
        </p>
        
        {/* Authentication Buttons */}
        <div className="flex gap-4 justify-center pt-8">
          <Button size="lg" variant="default">
            Sign In
          </Button>
          <Button size="lg" variant="outline">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
