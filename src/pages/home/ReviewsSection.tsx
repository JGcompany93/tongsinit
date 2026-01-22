import type { Review } from "./types";
import ReviewsSlider from "./ReviewsSlider";

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#0B4CC7] min-h-[95svh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-white">
          <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
            REVIEWS
          </span>
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold leading-tight">
            통신잇과 함께한 100% 리얼후기!
          </h2>
        </div>

        <ReviewsSlider reviews={reviews} />
      </div>
    </section>
  );
}
