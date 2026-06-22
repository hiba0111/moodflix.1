import { Card } from "@/components/ui/card";
import { Star, Heart, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Movie {
  title: string;
  genre: string;
  synopsis: string;
  rating: number;
  poster: string;
  streamingPlatforms: string[];
  actors: string[];
  director: string;
  year: number;
}

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: () => void;
  isInWatchlist?: boolean;
  onViewDetails?: () => void;
}

export default function MovieCard({
  movie,
  onAddToWatchlist,
  isInWatchlist = false,
  onViewDetails,
}: MovieCardProps) {
  const [posterError, setPosterError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToWatchlist = () => {
    onAddToWatchlist?.();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const placeholderGradient = `linear-gradient(135deg, #ff1744 0%, #c41c3b 100%)`;

  return (
    <Card className="bg-card border-border overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 h-full flex flex-col group">
      {/* Poster Container */}
      <div className="relative overflow-hidden bg-secondary h-72 flex items-center justify-center">
        {posterError ? (
          <div
            className="w-full h-full flex items-center justify-center text-center p-4"
            style={{ background: placeholderGradient }}
          >
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">🎬</div>
              <p className="text-sm font-semibold line-clamp-2">{movie.title}</p>
            </div>
          </div>
        ) : (
          <img
            src={movie.poster}
            alt={movie.title}
            onError={() => setPosterError(true)}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            onClick={onViewDetails}
            className="bg-primary hover:bg-primary/90"
          >
            View Details
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAddToWatchlist}
            className={justAdded || isInWatchlist ? "bg-primary/20 border-primary" : ""}
          >
            <Heart className={`w-4 h-4 ${isInWatchlist || justAdded ? "fill-primary text-primary" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 mb-2">{movie.title}</h3>

        {/* Year and Genre */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{movie.year || "N/A"}</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
            {movie.genre.split(",")[0]}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span className="font-semibold text-sm">{movie.rating}/10</span>
        </div>

        {/* Synopsis */}
        <p className="text-xs text-muted-foreground line-clamp-3 mb-3 flex-1">
          {movie.synopsis}
        </p>

        {/* Streaming Platforms */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.streamingPlatforms.slice(0, 3).map((platform) => (
            <span
              key={platform}
              className="text-xs bg-secondary border border-border px-2 py-1 rounded text-foreground"
            >
              {platform}
            </span>
          ))}
          {movie.streamingPlatforms.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{movie.streamingPlatforms.length - 3} more
            </span>
          )}
        </div>

        {/* Director */}
        {movie.director && (
          <p className="text-xs text-muted-foreground mb-2">
            <span className="font-semibold">Dir:</span> {movie.director}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            onClick={onViewDetails}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
          >
            Details
          </Button>
          <Button
            size="sm"
            onClick={handleAddToWatchlist}
            className={`flex-1 ${isInWatchlist || justAdded ? "bg-primary" : "bg-primary/50"}`}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
