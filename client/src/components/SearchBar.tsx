import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchType: "title" | "actor" | "director";
  onSearchTypeChange: (type: "title" | "actor" | "director") => void;
  onSearch: (query: string) => void;
}

const SearchBar = memo(function SearchBar({
  searchType,
  onSearchTypeChange,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim().toLowerCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-3 bg-card border border-border p-4 rounded-lg">
      <div className="flex gap-2 flex-wrap">
        {(["title", "actor", "director"] as const).map((type) => (
          <Button
            key={type}
            onClick={() => onSearchTypeChange(type)}
            variant={searchType === type ? "default" : "outline"}
            size="sm"
            className={searchType === type ? "bg-primary text-white" : "border-border"}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={`Search by ${searchType}... (e.g., ${
            searchType === "title"
              ? "Inception"
              : searchType === "actor"
              ? "Leonardo DiCaprio"
              : "Christopher Nolan"
          })`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-background border-border"
        />
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 px-6">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

export default SearchBar;
