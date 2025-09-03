import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { decksTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log('Fetching decks for user:', userId);
    
    // Fetch user's decks from database - properly filtered by userId
    const userDecks = await db
      .select()
      .from(decksTable)
      .where(eq(decksTable.userId, userId));
    
    console.log('Found user decks:', userDecks.length);
    
    return Response.json({ 
      success: true, 
      decks: userDecks 
    });
  } catch (error) {
    console.error('Failed to fetch decks:', error);
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
