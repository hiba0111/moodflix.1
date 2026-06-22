import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MoodInputFormProps {
  mood: string;
  onMoodChange: (mood: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const MoodInputForm = memo(function MoodInputForm({
  mood,
  onMoodChange,
  onSubmit,
  isLoading = false,
}: MoodInputFormProps) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="e.g., nostalgic, adventurous, contemplative..."
        value={mood}
        onChange={(e) => onMoodChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSubmit()}
        className="bg-background border-border"
      />
      <Button
        onClick={onSubmit}
        disabled={!mood.trim() || isLoading}
        className="bg-primary hover:bg-primary/90"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
});

export default MoodInputForm;
