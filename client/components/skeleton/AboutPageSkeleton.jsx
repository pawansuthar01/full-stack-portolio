import { motion } from "framer-motion";

export default function AboutPageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.3 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20"
    >
      {/* Title Skeleton */}
      <div className="text-center mb-20">
        <div className="h-14 w-64 mx-auto rounded bg-gray-700 animate-pulse" />
        <div className="mt-4 h-6 w-96 mx-auto rounded bg-gray-700 animate-pulse" />
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Left Column - Story Skeleton */}
        <div>
          <div className="h-10 w-48 mb-6 rounded bg-gray-700 animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="h-5 w-full max-w-xl rounded bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Right Column - Image Skeleton */}
        <div className="relative flex justify-center w-full h-auto sm:h-[500px]">
          <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-gray-600 to-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12 relative">
        <div
          className={`absolute ${
            /* Just assume desktop style here or customize */
            "left-1/2 transform -translate-x-1/2"
          } w-0.5 h-full bg-gradient-to-b from-gray-600 to-gray-700`}
        />
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className={`flex items-center ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div
              className={`${
                i % 2 === 0 ? "text-right pr-8 w-1/2" : "text-left pl-8 w-1/2"
              }`}
            >
              <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/30 space-y-3 animate-pulse">
                <div className="h-6 w-24 rounded bg-gray-600" />
                <div className="h-8 w-48 rounded bg-gray-600" />
                <div className="h-4 w-full max-w-sm rounded bg-gray-600" />
              </div>
            </div>

            <div className="relative z-10">
              <div className="w-4 h-4 bg-gray-600 rounded-full border-4 border-gray-800" />
            </div>

            <div className="w-1/2" />
          </div>
        ))}
      </div>

      {/* Fun Facts Skeleton */}
      <div>
        <div className="h-10 w-48 mx-auto mb-12 rounded bg-gray-700 animate-pulse" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="p-6 bg-gray-700/50 rounded-2xl border border-gray-600/30 animate-pulse"
            >
              <div className="w-16 h-16 rounded-full bg-gray-600 mb-4 mx-auto" />
              <div className="h-6 w-12 rounded bg-gray-600 mx-auto mb-2" />
              <div className="h-4 w-24 rounded bg-gray-600 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
