

export function CustomerCard() {
  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border-4 border-dashed border-gray-400 bg-gray-200 rounded-lg">
      <div className="mb-4">
        <h2 className="text-black text-xl font-semibold">Customer Card</h2>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-8 bg-gray-300 rounded w-1/4 mt-6"></div>
      </div>
    </div>
  )
}

