export default function FeedbackSkeleton() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden animate-pulse">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 w-72 bg-gray-700 rounded mx-auto mb-4" />
          <div className="h-5 w-[80%] bg-gray-700 rounded mx-auto" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card Skeleton */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-yellow-400/20">
              <div className="w-10 h-10 bg-gray-700 rounded-full" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-600 rounded" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="h-20 bg-gray-700 rounded mb-8 w-full" />

              {/* Avatar and Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-600" />
                <div className="text-center md:text-left space-y-1">
                  <div className="h-4 w-40 bg-gray-600 rounded" />
                  <div className="h-4 w-28 bg-gray-600 rounded" />
                  <div className="h-3 w-24 bg-yellow-500 rounded" />
                </div>
              </div>
            </div>

            {/* Inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-3xl" />
          </div>

          {/* Navigation Buttons Skeleton */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
            <div className="w-10 h-10 bg-gray-700 rounded-full" />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
            <div className="w-10 h-10 bg-gray-700 rounded-full" />
          </div>
        </div>

        {/* Pagination Dots Skeleton */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-3 h-3 rounded-full bg-gray-600" />
          ))}
        </div>

        {/* Thumbnails Skeleton */}
        <div className="hidden md:flex justify-center gap-4 mt-12">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-700/30 border border-gray-700/30 rounded-xl"
            >
              <div className="w-8 h-8 rounded-full bg-gray-600" />
              <div className="space-y-1">
                <div className="w-20 h-3 bg-gray-600 rounded" />
                <div className="w-16 h-2 bg-gray-500 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button Skeleton */}
        <div className="text-center mt-16">
          <div className="px-8 py-4 bg-gray-700 rounded-full inline-block w-64 h-12" />
        </div>
      </div>
    </section>
  );
}
