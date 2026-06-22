import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PlatformFilterProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}

const PLATFORMS = ["Netflix", "Prime Video", "Disney+", "Hulu", "HBO Max"];

const PlatformFilter = memo(function PlatformFilter({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFilterProps) {
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter((p) => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <Card className="bg-card border-border p-3 flex flex-wrap gap-2">
      {PLATFORMS.map((platform) => (
        <Button
          key={platform}
          size="sm"
          variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
          onClick={() => togglePlatform(platform)}
          className={selectedPlatforms.includes(platform) ? "bg-primary" : ""}
        >
          {platform}
        </Button>
      ))}
    </Card>
  );
});

export default PlatformFilter;
