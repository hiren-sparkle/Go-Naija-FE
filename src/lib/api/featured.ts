
import { toast } from "@/components/ui/use-toast";
import { FeaturedContent } from "./types";
import { simulateRequest } from "./utils";

// Get featured content
export const getFeaturedContent = async (): Promise<FeaturedContent> => {
  try {
    const featuredContent = {
      id: "featured1",
      title: "This Week's Hits",
      description: "The biggest songs of the week, updated every Friday with new releases.",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljfGVufDB8fDB8fHww",
      type: "playlist" as const,
      tracks: 50
    };
    
    return await simulateRequest(featuredContent);
  } catch (error) {
    console.error("Error fetching featured content:", error);
    toast({
      title: "Error",
      description: "Failed to load featured content",
      variant: "destructive"
    });
    
    // Return fallback data
    return {
      id: "featured-fallback",
      title: "Discover Weekly",
      description: "Your personal playlist with fresh discoveries and deep cuts chosen just for you. Updated every Monday.",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG11c2ljfGVufDB8fDB8fHww",
      type: "playlist" as const
    };
  }
};
