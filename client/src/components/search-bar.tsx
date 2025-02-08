import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ query, onQueryChange, placeholder = "Search bhajans..." }: SearchBarProps) {
  return (
    <div className="w-full max-w-sm">
      <Label htmlFor="search" className="sr-only">
        Search bhajans
      </Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
}