export const DoctorCard = ({ onClick, name, description, speciality, label }) => {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-ink/5 transition-transform duration-200 ease-spring hover:-translate-y-1">
            <img
                src="/images/home_pediatric.svg"
                alt=""
                width="320"
                height="240"
                loading="lazy"
                className="h-48 w-full bg-canvas object-contain"
            />
            <div className="flex flex-1 flex-col p-5">
                <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-ink">{name}</h3>
                    <p className="mt-1 text-sm font-medium text-canopy">{speciality}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-mute">{description}</p>
                </div>
                <button
                    type="button"
                    onClick={onClick}
                    className="mt-5 min-h-11 w-full rounded-full bg-canopy px-4 py-2 text-sm font-medium text-white transition-colors duration-200 ease-spring hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy active:scale-[0.98]"
                >
                    {label}
                </button>
            </div>
        </article>
    );
};