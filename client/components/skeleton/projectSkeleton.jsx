export default function ProjectSkeleton() {
  return (
    <section className="mx-auto p-6 max-sm:p-0 text-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="h-10 w-72 bg-gray-700 rounded mx-auto mb-4" />
          <div className="h-5 w-[80%] bg-gray-700 rounded mx-auto mb-12" />
        </div>

        {/* Project Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="w-full h-40 bg-gray-700 rounded-lg" />
              <div className="h-6 w-3/4 bg-gray-600 rounded" />
              <div className="h-4 w-1/2 bg-gray-600 rounded" />
              <div className="h-3 w-full bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-5 flex justify-center gap-2 items-center mt-10">
          <div className="h-6 w-40 bg-gray-700 rounded" />
          <div className="w-5 h-5 bg-purple-700 rounded-full" />
        </div>
      </div>
    </section>
  );
}
