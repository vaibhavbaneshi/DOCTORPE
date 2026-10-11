export default function Popup({ onClick, result, success, insight, insightLoading }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="screening-result-title"
        >
            <div className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-y-auto rounded-[1.6rem] bg-surface p-8 shadow-tint">
                <img
                    src="/images/result.svg"
                    alt=""
                    width="128"
                    height="128"
                    className="mx-auto mb-4 h-24 w-24"
                />
                <h2 id="screening-result-title" className="text-center text-xl font-semibold text-ink">
                    Screening result
                </h2>
                <p
                    className={
                        success
                            ? "mt-4 text-center text-lg font-semibold text-canopy"
                            : "mt-4 text-center text-lg font-semibold text-red-700"
                    }
                >
                    {result}
                </p>
                {(insightLoading || insight) && (
                    <div className="mt-6 rounded-xl border border-ink/10 bg-canvas p-4 text-left text-sm leading-relaxed text-mute">
                        <p className="font-medium text-ink">What this may mean</p>
                        {insightLoading && !insight && (
                            <p className="mt-2 animate-pulse">Preparing a plain-language summary…</p>
                        )}
                        {insight && <p className="mt-2">{insight}</p>}
                    </div>
                )}
                <button
                    type="button"
                    onClick={onClick}
                    className="mt-6 min-h-11 w-full rounded-full bg-canopy px-5 py-3 font-medium text-white hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                >
                    Close result
                </button>
            </div>
        </div>
    );
}