import React, { useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  cover: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  artist,
  cover,
  className,
  size = "md",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "max-w-[160px]",
    md: "max-w-[200px]",
    lg: "max-w-[240px]",
  };

  return (
    <Link
      to={`/song/${id}`} // ✅ Link to Song Details Page
      className={cn(
        "group relative rounded-md overflow-hidden transition-all duration-300",
        sizeClasses[size],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-md mb-3">
        <img
          src={cover}
          alt={title}
          className={cn(
            "w-full h-full object-cover smooth-transition",
            isHovered && "scale-105 brightness-75"
          )}
        />

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button className="h-12 w-12 rounded-full bg-music-accent flex items-center justify-center shadow-lg transform translate-y-1 hover:scale-105 smooth-transition">
              <Play className="h-6 w-6 text-white ml-1" />
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
        <p className="text-xs text-music-subtle line-clamp-1 mt-1">{artist}</p>
      </div>
    </Link>
  );
};

export default SongCard;
