export const ConsultCard = ({ image, title, onClick }) => {
    return (
        <article className="w-56 shrink-0 snap-start rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5">
            <img src={image} alt="" width={160} height={120} loading="lazy" className="h-28 w-full rounded-2xl object-contain" />
            <h3 className="mt-4 text-sm font-medium text-ink">{title}</h3>
            <button
                type="button"
                onClick={onClick}
                className="mt-4 min-h-11 text-sm text-canopy underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
            >
                Start consult
            </button>
        </article>
    );
};
