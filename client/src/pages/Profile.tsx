import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, Heart, History } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Profile() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Mock data for recommendation history
  const recommendationHistory = [
    { mood: "Happy", date: "2 hours ago", movieCount: 6 },
    { mood: "Nostalgic", date: "1 day ago", movieCount: 6 },
    { mood: "Thriller", date: "3 days ago", movieCount: 6 },
  ];

  const favoriteGenres = ["Action", "Drama", "Sci-Fi", "Comedy"];
  const preferredPlatforms = ["Netflix", "Prime Video", "Disney+"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663774426733/CtmJmSJEKS7nMoyqwus677/moodflix-logo-jdaakQgxw8EK8QnH94dFTL.webp"
              alt="Moodflix"
              className="h-10"
            />
            <h1 className="text-2xl font-bold text-primary">MOODFLIX</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Back Button */}
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="bg-card border-border p-6 md:col-span-1">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{user?.name || "User"}</h2>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
              <Button variant="outline" className="w-full border-primary text-primary">
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Stats and Preferences */}
          <div className="md:col-span-2 space-y-6">
            {/* Recommendation History */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Recommendation History</h3>
              </div>
              <div className="space-y-3">
                {recommendationHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div>
                      <p className="font-semibold">{item.mood}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                      {item.movieCount} movies
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Favorite Genres */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-bold mb-4">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Preferred Platforms */}
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-bold mb-4">Preferred Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {preferredPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Watchlist Stats */}
            <Card className="bg-card border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Watchlist Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Movies Saved</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">8</p>
                  <p className="text-sm text-muted-foreground">Searches</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
