import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Bhajan } from "@shared/schema";

interface BhajanListProps {
  bhajans: Bhajan[];
}

export function BhajanList({ bhajans }: BhajanListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="p-4 grid gap-4">
        {bhajans.map((bhajan) => (
          <Link key={bhajan.id} href={`/bhajan/${bhajan.id}`}>
            <Card className="cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl font-bold text-primary w-12 text-center">
                    {bhajan.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{bhajan.title}</h3>
                    <p className="text-muted-foreground">{bhajan.titleEnglish}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}
