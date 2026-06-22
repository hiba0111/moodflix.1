import { Card } from "@/components/ui/card";
import { TrendingUp, Flame } from "lucide-react";
import { memo } from "react";

interface TrendingMood {
  mood: string;
  count: number;
  trend: "up" | "down" | "stable";
}

interface TrendingMoodsProps {
  moods: TrendingMood[];
  onMoodClick?: (mood: string) => void;
}

const TrendingMoods = memo(function TrendingMoods({ moods, onMoodClick }: TrendingMoodsProps) {
  return (
    <Card className="bg-card border-border p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Trending Moods</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.mood}
            onClick={() => onMoodClick?.(mood.mood)}
            className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-all text-center group"
          >
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {mood.mood}
            </p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {mood.count} searches
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
});

export default TrendingMoods;
