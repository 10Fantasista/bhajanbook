import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BhajanList } from "@/components/bhajan-list";
import { SearchBar } from "@/components/search-bar";
import { cacheBhajans, getCachedBhajans } from "@/lib/storage";
import type { Bhajan } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: bhajans = [] } = useQuery<Bhajan[]>({
    queryKey: ["/api/bhajans"],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await fetch(queryKey[0] as string);
        const data = await response.json();
        await cacheBhajans(data);
        return data;
      } catch (error) {
        const cached = await getCachedBhajans();
        if (cached) return cached;
        throw error;
      }
    },
  });

  const filteredBhajans = bhajans.filter((bhajan) => {
    const query = searchQuery.toLowerCase();
    return (
      bhajan.number.toString().includes(query) ||
      bhajan.title.toLowerCase().includes(query) ||
      bhajan.titleIso.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto">
      <div className="py-6">
        <h1 className="text-4xl font-bold mb-2">Hindu Bhajan Songbook</h1>
        <p className="text-muted-foreground mb-6">
          A collection of spiritual songs with dual-language support
        </p>
        <div className="mb-6">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        </div>
        <BhajanList bhajans={filteredBhajans} />
      </div>
    </div>
  );
}