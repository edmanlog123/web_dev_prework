import CreatorCard from "./CreatorCard";
import type { Creator } from "../types/types";

interface Props {
  creators: Creator[];
  onEdit: (creator: Creator) => void;
}

export default function CreatorCarousel({ creators, onEdit }: Props) {
  // Duplicate creators for infinite loop
  const looped = [...creators, ...creators];

  return (
    <div className="relative overflow-hidden w-full py-6">
      <div
        className="flex w-max animate-carousel"
        style={{ animation: "carousel-scroll 30s linear infinite" }}
      >
        {looped.map((creator, idx) => (
          <div key={idx} className="mx-4">
            <CreatorCard
              name={creator.name}
              bio={creator.bio}
              image={creator.image}
              links={creator.links}
              onEdit={() => onEdit(creator)}
            />
          </div>
        ))}
      </div>

      {/* Custom keyframes (must be in global CSS or Tailwind config) */}
    </div>
  );
}
