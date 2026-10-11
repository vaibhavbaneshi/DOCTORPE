export function ErrorMessage({ message }) {
    return (
      <div className="sticky top-24 z-30 flex flex-col items-center px-4" role="alert" aria-live="assertive">
            <div className="mt-4 w-full max-w-lg rounded-[1.25rem] bg-red-50 px-4 py-3 text-red-800 ring-1 ring-red-200">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
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
            <p className="font-semibold pr-3">Could not continue.</p>
            <p>{message}</p>
            </div>
        </div>
      </div>
    );
  }