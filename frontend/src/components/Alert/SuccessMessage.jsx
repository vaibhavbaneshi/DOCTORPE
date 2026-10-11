export function SuccessMessage({ message }) {
    return (
      <div className="sticky top-24 z-30 flex flex-col items-center px-4" role="status" aria-live="polite">
        <div className="mx-auto mt-4 w-full max-w-lg rounded-[1.25rem] bg-canopy px-4 py-3 text-white shadow-tint">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-semibold pr-3">Done.</p>
            <p>{message}</p>
            </div>
        </div>
      </div>
    );
  }