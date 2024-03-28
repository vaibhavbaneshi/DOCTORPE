export function ErrorMessage({ message }) {
    return (
      <div className="sticky top-0 flex flex-col items-center z-10">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 sticky top-0 z-10 inline-block">
            <div className="flex items-center">
            <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="font-bold pr-3">Error alert!</p>
            <p>{message}</p>
            </div>
        </div>
      </div>
    );
  }