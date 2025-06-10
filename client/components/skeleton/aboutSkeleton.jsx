export default function AboutSkeleton() {
  return (
    <section className="w-full pt-20 mt-10 lg:mt-0 mb-22 max-sm:mb-2 flex max-[900px]:flex-col justify-center items-center animate-pulse">
      {/* Image Section */}
      <div className="flex justify-center max-[900px]:w-[80%] items-center max-[900px]:order-2 order-1">
        <div className="relative">
          <div className="p-[4px] rounded-md">
            <div className="absolute top-0 p-2 left-0 w-full h-full border-4 bg-gradient-to-r from-blue-400 to-purple-500 transform rotate-[-3deg]" />
            <div className="relative bg-white p-1">
              <div className="w-72 h-72 bg-gray-300 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="w-[50%] ml-12 max-sm:ml-0 max-[900px]:w-[80%] max-sm:items-center max-sm:text-center max-[900px]:order-1 order-2 flex flex-col">
        <div className="h-6 w-32 bg-gray-300 rounded mb-4 mx-auto lg:mx-0" />
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-6 max-sm:h-6" />
        <div className="space-y-3 w-full">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-300 rounded w-4/6" />
        </div>
        <div className="mt-6 h-10 w-36 bg-gray-300 rounded-full" />
      </div>
    </section>
  );
}
