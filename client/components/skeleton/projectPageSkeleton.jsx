import { motion } from "framer-motion";

export default function ProjectsPageSkeleton() {
  // For skeleton placeholders, we assume fixed numbers like 6 cards
  const skeletonArray = Array(6).fill(0);

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.3 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header Skeleton */}
      <div className="text-center mb-16 space-y-4">
        <div className="h-14 w-72 mx-auto rounded bg-gray-700 animate-pulse" />
        <div className="h-6 w-96 mx-auto rounded bg-gray-700 animate-pulse" />
      </div>

      {/* Filters & Search Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12">
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 rounded bg-gray-700 animate-pulse" />
          <div className="flex gap-2 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-80">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded bg-gray-700 animate-pulse" />
          <div className="pl-10 pr-4 py-3 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonArray.map((_, i) => (
          <div
            key={i}
            className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/30 animate-pulse"
          >
            <div className="h-40 rounded-md bg-gray-600 mb-6" />
            <div className="h-6 w-3/4 rounded bg-gray-600 mb-3" />
            <div className="h-4 w-full max-w-xs rounded bg-gray-600 mb-4" />
            <div className="h-6 w-24 rounded bg-gray-600" />
          </div>
        ))}
      </div>

      {/* No Results Skeleton (Hidden by default, can be toggled) */}
      {/* You can render this conditionally when loading and no data */}
      {/* <div className="text-center py-12 space-y-4">
        <div className="h-16 w-16 rounded-full bg-gray-700 animate-pulse mx-auto" />
        <div className="h-8 w-48 rounded bg-gray-700 mx-auto animate-pulse" />
        <div className="h-5 w-80 rounded bg-gray-700 mx-auto animate-pulse" />
      </div> */}

      {/* Stats Skeleton */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/30 animate-pulse"
          >
            <div className="h-10 w-20 rounded bg-gray-600 mx-auto mb-2" />
            <div className="h-5 w-28 rounded bg-gray-600 mx-auto" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
