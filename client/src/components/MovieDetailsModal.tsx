import { Movie } from "@/data/movies-extended";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
  onAddToWatchlist: () => void;
}

export default function MovieDetailsModal({
  movie,
  onClose,
  onAddToWatchlist,
}: MovieDetailsModalProps) {
  const [posterError, setPosterError] = useState(false);

  const handleShare = () => {
    const text = `Check out ${movie.title} (${movie.year}) - Rating: ${movie.rating}/10 on Moodflix!`;
    if (navigator.share) {
      navigator.share({ title: "Moodflix", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

  const placeholderGradient = `linear-gradient(135deg, #ff1744 0%, #c41c3b 100%)`;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-primary hover:bg-primary/90 rounded-full p-2"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
          {/* Poster */}
          <div className="sm:col-span-1">
            <div className="relative overflow-hidden rounded-lg bg-secondary h-80 flex items-center justify-center">
              {posterError ? (
                <div
                  className="w-full h-full flex items-center justify-center text-center p-4"
                  style={{ background: placeholderGradient }}
                >
                  <div className="text-white">
                    <div className="text-4xl font-bold mb-2">🎬</div>
                    <p className="text-sm font-semibold">{movie.title}</p>
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
            </div>
          </div>

          {/* Details */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{movie.year}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {movie.rating}/10
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Genre</h3>
              <p className="text-muted-foreground">{movie.genre}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-muted-foreground">{movie.synopsis}</p>
            </div>

            {movie.director && (
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
            )}

            {movie.actors && movie.actors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Cast</h3>
                <p className="text-muted-foreground">{movie.actors.join(", ")}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Available On</h3>
              <div className="flex flex-wrap gap-2">
                {movie.streamingPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={onAddToWatchlist}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to Watchlist
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1 border-border">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
