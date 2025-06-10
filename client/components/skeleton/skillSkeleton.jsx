export default function SkillSkeleton() {
  return (
    <section className="flex justify-center relative overflow-hidden py-20 animate-pulse">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="h-10 w-60 bg-gray-700 rounded mx-auto mb-4" />
          <div className="h-4 w-[80%] bg-gray-700 rounded mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Categories */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="h-6 w-40 bg-gray-700 rounded mb-6" />
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-800 p-4 rounded-xl"
                >
                  <div className="w-6 h-6 bg-gray-700 rounded-full" />
                  <div className="h-4 w-32 bg-gray-600 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Skills Progress */}
          <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <div className="h-6 w-60 bg-gray-700 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-32 bg-gray-600 rounded" />
                  </div>
                  <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 w-[60%] rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-700 rounded-full text-sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r mt-10 from-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text block */}
            <div>
              <div className="h-8 w-72 bg-gray-700 rounded mb-4" />
              <div className="h-4 w-full bg-gray-700 rounded mb-2" />
              <div className="h-4 w-[90%] bg-gray-700 rounded mb-2" />
              <div className="h-4 w-[80%] bg-gray-700 rounded mb-6" />
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-3" />
                  <div className="h-3 w-60 bg-gray-700 rounded" />
                </div>
              ))}
            </div>

            {/* Stats block */}
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="h-6 w-16 bg-gray-500 rounded mx-auto mb-2" />
                  <div className="h-3 w-24 bg-gray-700 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
