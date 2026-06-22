import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Play, Share2, Sparkles, User, Search as SearchIcon } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import { useState, useMemo } from "react";
import MovieCard from "@/components/MovieCard";
import MoodChipSelector from "@/components/MoodChipSelector";
import MoodInputForm from "@/components/MoodInputForm";
import AnimatedResultsContainer from "@/components/AnimatedResultsContainer";
import TrendingMoods from "@/components/TrendingMoods";
import MovieDetailsModal from "@/components/MovieDetailsModal";
import PlatformFilter from "@/components/PlatformFilter";
import ThemeToggle from "@/components/ThemeToggle";
import PersonalityQuiz from "@/components/PersonalityQuiz";
import SearchBar from "@/components/SearchBar";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { expandedMovieDatabase, Movie } from "@/data/movies-massive";

export default function Home() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [mood, setMood] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"title" | "actor" | "director">("title");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trendingMoods = [
    { mood: "Happy", count: 24, trend: "up" as const },
    { mood: "Nostalgic", count: 18, trend: "up" as const },
    { mood: "Thriller", count: 15, trend: "stable" as const },
    { mood: "Romantic", count: 12, trend: "down" as const },
  ];

  // Get recommendations based on mood
  const getRecommendations = (searchMood: string) => {
    const moodLower = searchMood.toLowerCase();
    let filtered = expandedMovieDatabase.filter((movie) =>
      movie.moods.some((m) => m.toLowerCase().includes(moodLower)) ||
      movie.genre.toLowerCase().includes(moodLower) ||
      movie.title.toLowerCase().includes(moodLower)
    );

    // Sort by rating (highest first)
    filtered = filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  };

  // Filter movies based on platforms and search
  const filteredMovies = useMemo(() => {
    let movies = recommendations;

    if (selectedPlatforms.length > 0) {
      movies = movies.filter((movie) =>
        movie.streamingPlatforms.some((p) => selectedPlatforms.includes(p))
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (searchType === "title") {
        movies = movies.filter((movie) => movie.title.toLowerCase().includes(query));
      } else if (searchType === "actor") {
        movies = movies.filter((movie) =>
          movie.actors.some((a) => a.toLowerCase().includes(query))
        );
      } else if (searchType === "director") {
        movies = movies.filter((movie) =>
          movie.director.toLowerCase().includes(query)
        );
      }
    }

    // Sort by rating (highest first)
    return movies.sort((a, b) => b.rating - a.rating);
  }, [recommendations, selectedPlatforms, searchQuery, searchType]);

  const handleGetRecommendations = async () => {
    const moodToUse = selectedMood || mood;
    if (!moodToUse.trim()) {
      toast.error("Please enter or select a mood");
      return;
    }

    setIsLoading(true);
    try {
      const recs = getRecommendations(moodToUse);
      setRecommendations(recs);
      setShowResults(true);
      setMood("");
      setSelectedMood("");
      toast.success(`Found ${recs.length} movies for "${moodToUse}"`);
    } catch (error) {
      toast.error("Failed to get recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (answers: any) => {
    setQuizAnswers(answers);
    setSelectedMood(answers.mood);
    setShowQuiz(false);
    toast.success("Quiz complete! Getting recommendations based on your answers...");
    
    // Trigger recommendations with quiz mood
    setTimeout(() => {
      const recs = getRecommendations(answers.mood);
      setRecommendations(recs);
      setShowResults(true);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (recommendations.length === 0) {
      setRecommendations(expandedMovieDatabase);
    }
    setShowResults(true);
  };

  const handleAddToWatchlist = (movie: Movie) => {
    if (!watchlist.find((m) => m.title === movie.title)) {
      setWatchlist([...watchlist, movie]);
      toast.success(`${movie.title} added to watchlist!`);
    } else {
      toast.info("Already in watchlist");
    }
  };

  const handleViewDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">🎬</span>
            <h1 className="text-2xl font-bold">MOODFLIX</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setLocation("/profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-yellow-400">✨</span> What's Your Mood? <span className="text-yellow-400">✨</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Tell us how you're feeling, and we'll recommend the perfect movies for you
              </p>
            </div>

            {/* Trending Moods */}
            <TrendingMoods moods={trendingMoods} />

            {/* Mood Selection Card */}
            <Card className="bg-card border-border p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Enter your mood or select a preset:</h3>
              <MoodInputForm
                mood={mood}
                onMoodChange={setMood}
                onSubmit={handleGetRecommendations}
                isLoading={isLoading}
              />

              <div className="my-6 text-center text-muted-foreground">or</div>

              <h4 className="font-semibold mb-3">Or choose a preset mood:</h4>
              <MoodChipSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleGetRecommendations}
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isLoading ? "Loading..." : "Get Recommendations"}
                </Button>
                <Button
                  onClick={() => setShowQuiz(true)}
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </Card>

            {/* Search Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <SearchIcon className="w-6 h-6 text-primary" />
                Search Movies
              </h3>
              <SearchBar
                searchType={searchType}
                onSearchTypeChange={setSearchType}
                onSearch={handleSearch}
              />
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="mb-8">
              <Button
                onClick={() => {
                  setShowResults(false);
                  setRecommendations([]);
                  setSearchQuery("");
                  setSelectedPlatforms([]);
                }}
                variant="outline"
                className="mb-4"
              >
                ← Back to Search
              </Button>
              <h2 className="text-3xl font-bold mb-4">
                Movies for "{selectedMood || mood}"
              </h2>
              <p className="text-muted-foreground">
                Found {filteredMovies.length} movies • Sorted by rating (highest first)
              </p>
            </div>

            {/* Platform Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Filter by streaming platform:</h4>
              <PlatformFilter
                selectedPlatforms={selectedPlatforms}
                onPlatformChange={setSelectedPlatforms}
              />
            </div>

            {/* Results */}
            {filteredMovies.length > 0 ? (
              <AnimatedResultsContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMovies.map((movie, index) => (
                    <MovieCard
                      key={`${movie.title}-${index}`}
                      movie={movie}
                      onAddToWatchlist={() => handleAddToWatchlist(movie)}
                      isInWatchlist={watchlist.some((m) => m.title === movie.title)}
                      onViewDetails={() => handleViewDetails(movie)}
                    />
                  ))}
                </div>
              </AnimatedResultsContainer>
            ) : (
              <Card className="bg-card border-border p-8 text-center">
                <p className="text-muted-foreground mb-4">No movies found matching your criteria</p>
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setRecommendations([]);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Try Another Search
                </Button>
              </Card>
            )}
          </>
        )}
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <PersonalityQuiz
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Movie Details Modal */}
      {isModalOpen && selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={() => setIsModalOpen(false)}
          onAddToWatchlist={() => handleAddToWatchlist(selectedMovie)}
        />
      )}
    </div>
  );
}
