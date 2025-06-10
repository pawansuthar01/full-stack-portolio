import { motion } from "framer-motion";

export default function BannerSkeleton() {
  return (
    <section className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Background blur & animated dots placeholder (optional or skipped in skeleton) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content Skeleton */}
        <div className="text-center lg:text-left animate-pulse">
          <div className="h-10 lg:h-16 w-60 bg-gray-700/50 rounded mb-6 mx-auto lg:mx-0" />
          <div className="h-8 w-48 bg-gray-700/50 rounded mb-6 mx-auto lg:mx-0" />
          <div className="h-4 w-full max-w-xl bg-gray-700/50 rounded mb-4 mx-auto lg:mx-0" />
          <div className="h-4 w-5/6 bg-gray-700/50 rounded mb-8 mx-auto lg:mx-0" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <div className="h-10 w-40 bg-gray-700/50 rounded-full" />
            <div className="h-10 w-40 bg-gray-700/50 rounded-full" />
          </div>

          <div className="flex justify-center lg:justify-start space-x-6">
            <div className="h-10 w-10 bg-gray-700/50 rounded-full" />
            <div className="h-10 w-10 bg-gray-700/50 rounded-full" />
            <div className="h-10 w-10 bg-gray-700/50 rounded-full" />
            <div className="h-10 w-24 bg-gray-700/50 rounded-full" />
          </div>
        </div>

        {/* Right Content Skeleton (Image Circle) */}
        <div className="relative w-80 h-80 mx-auto animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 blur-xl" />
          <div className="relative w-full h-full bg-gray-700/30 rounded-full backdrop-blur-sm border border-white/10" />

          {/* Floating emoji placeholders */}
          {[
            "top-0 right-8",
            "top-8 left-0",
            "bottom-8 right-0",
            "bottom-0 left-8",
          ].map((pos, idx) => (
            <div
              key={idx}
              className={`absolute ${pos} w-6 h-6 bg-gray-600/50 rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Icon Skeleton */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
        <div className="h-8 w-8 bg-gray-600/50 rounded-full" />
      </div>
    </section>
  );
}
