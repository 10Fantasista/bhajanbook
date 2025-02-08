import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Type } from "lucide-react";
import type { Bhajan } from "@shared/schema";

interface BhajanViewProps {
  bhajan: Bhajan;
}

export function BhajanView({ bhajan }: BhajanViewProps) {
  const [fontSize, setFontSize] = useState(16);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const scroll = () => {
      if (isScrolling && contentRef.current) {
        contentRef.current.scrollTop += scrollSpeed;
        animationFrame = requestAnimationFrame(scroll);
      }
    };

    if (isScrolling) {
      animationFrame = requestAnimationFrame(scroll);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isScrolling, scrollSpeed]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsScrolling(!isScrolling)}
        >
          {isScrolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <div className="flex items-center gap-2 flex-1">
          <Type className="h-4 w-4" />
          <Slider
            value={[fontSize]}
            onValueChange={([value]) => setFontSize(value)}
            min={12}
            max={32}
            step={1}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div ref={contentRef} className="overflow-y-auto max-h-[70vh]">
            <h1 className="text-3xl font-bold mb-2">{bhajan.title}</h1>
            <h2 className="text-xl text-muted-foreground mb-6">{bhajan.titleEnglish}</h2>
            
            <div className="grid gap-8">
              <div style={{ fontSize: `${fontSize}px` }}>
                {bhajan.lyrics.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
              
              <div style={{ fontSize: `${fontSize}px` }} className="text-muted-foreground">
                {bhajan.lyricsEnglish.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
