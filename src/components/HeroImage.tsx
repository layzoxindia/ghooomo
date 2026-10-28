import Image from "next/image";
import type { HeroMedia } from "@/lib/media";

/** Still background photo that fills its parent. Decorative, so it has no alt text. */
export default function HeroImage({ media, priority = true }: { media: HeroMedia; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {media.mobilePoster ? (
        <>
          <Image src={media.mobilePoster} alt="" fill priority={priority} sizes="100vw" quality={80} className="object-cover md:hidden" />
          <Image src={media.poster} alt="" fill priority={priority} sizes="100vw" quality={80} className="hidden object-cover md:block" />
        </>
      ) : (
        <Image src={media.poster} alt="" fill priority={priority} sizes="100vw" quality={80} className="object-cover" />
      )}
    </div>
  );
}
