export function SuccessMessage({ message }) {
    return (
      <div className="sticky top-0 flex flex-col items-center z-10">
        <div className="ml-auto mr-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4 sticky top-0 z-10 inline-block">
            <div className="flex items-center">
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
            <p className="font-bold pr-3">Success alert!</p>
            <p>{message}</p>
            </div>
        </div>
      </div>
    );
  }