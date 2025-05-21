
import { toast } from "@/components/ui/use-toast";
import { Check, AlertTriangle, Info, X } from "lucide-react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationOptions {
  title?: string;
  description?: string;
  duration?: number;
}

/**
 * Shows a toast notification
 */
export const notify = (
  type: NotificationType = "info",
  options: NotificationOptions
) => {
  const { title, description, duration = 5000 } = options;
  
  const icons = {
    success: <Check className="h-5 w-5 text-green-500" />,
    error: <X className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  return toast({
    title: title,
    description: description,
    duration: duration,
    variant: type === "error" ? "destructive" : "default",
    action: icons[type],
  });
};

// Convenience methods
export const success = (options: NotificationOptions) => notify("success", options);
export const error = (options: NotificationOptions) => notify("error", options);
export const warning = (options: NotificationOptions) => notify("warning", options);
export const info = (options: NotificationOptions) => notify("info", options);

// Common notifications
export const nowPlaying = (title: string, artist: string) => {
  success({
    title: "Now Playing",
    description: `${title} - ${artist}`,
    duration: 3000
  });
};

export const addedToFavorites = (itemName: string) => {
  success({
    title: "Added to Favorites",
    description: `${itemName} has been added to your favorites`,
    duration: 3000
  });
};

export const removedFromFavorites = (itemName: string) => {
  info({
    title: "Removed from Favorites",
    description: `${itemName} has been removed from your favorites`,
    duration: 3000
  });
};

export const networkError = () => {
  error({
    title: "Network Error",
    description: "Unable to connect to the server. Please check your connection and try again.",
    duration: 6000
  });
};
