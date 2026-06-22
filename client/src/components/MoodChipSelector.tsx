import { memo } from "react";
import { Button } from "@/components/ui/button";

interface MoodChipSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const PRESET_MOODS = [
  "Happy",
  "Sad",
  "Funny",
  "Thriller",
  "Horror",
  "Romantic",
  "Inspirational",
  "Mysterious",
];

const MoodChipSelector = memo(function MoodChipSelector({
  selectedMood,
  onMoodSelect,
}: MoodChipSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {PRESET_MOODS.map((mood) => (
        <Button
          key={mood}
          onClick={() => onMoodSelect(mood)}
          variant={selectedMood === mood ? "default" : "outline"}
          className={selectedMood === mood ? "bg-primary" : "border-border"}
        >
          {mood}
        </Button>
      ))}
    </div>
  );
});

export default MoodChipSelector;
