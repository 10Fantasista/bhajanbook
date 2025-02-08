import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { BhajanView } from "@/components/bhajan-view";
import type { Bhajan } from "@shared/schema";

export default function BhajanPage() {
  const [, params] = useRoute("/bhajan/:id");
  const id = params?.id;

  const { data: bhajan, isLoading } = useQuery<Bhajan>({
    queryKey: [`/api/bhajans/${id}`],
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!bhajan) {
    return <div className="p-8 text-center">Bhajan not found</div>;
  }

  return <BhajanView bhajan={bhajan} />;
}
