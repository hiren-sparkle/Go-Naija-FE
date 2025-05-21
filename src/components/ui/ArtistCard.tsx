import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface ArtistCardProps {
  id: string;
  key:string;
  name: string;
  cover: string;
  image:string;
  title:string;
  artist:string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, name, cover }) => {
  return (
    <div className="relative group">
      <Link to={`/artist/${id}`} className="block">
        {/* Artist Image */}
        <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={cover} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {/* Play Button - Appears on Hover */}
          <button 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
              e.preventDefault(); 
              console.log(`Playing artist: ${name}`);
            }}
          >
            <Play size={40} className="text-white" />
          </button>
        </div>
      </Link>
      {/* Artist Name */}
      <h3 className="text-white text-sm mt-2 truncate">{name}</h3>
    </div>
  );
};

export default ArtistCard;
