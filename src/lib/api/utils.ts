
import { error } from "@/lib/notifications";

// Simulate API request delay and potential failures
export const simulateRequest = async <T>(data: T): Promise<T> => {
  // Add random delay between 300-800ms to simulate network request
  const delay = Math.floor(Math.random() * 500) + 300;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Randomly fail 5% of requests to simulate network issues
  if (Math.random() < 0.05) {
    error({
      title: "Request Failed",
      description: "There was an error processing your request. Please try again."
    });
    throw new Error("Network request failed");
  }
  
  return data;
};

// Mock audio URLs for our tracks
// In a real app, these would be fetched from a real API
export const AUDIO_SAMPLES = [
  "/audio/sample1.mp3", 
  "/audio/sample2.mp3",
  "/audio/sample3.mp3",
  "/audio/sample4.mp3",
  "/audio/sample5.mp3"
];
