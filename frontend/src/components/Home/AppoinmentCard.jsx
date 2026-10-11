export const AppointmentCard = ({ image, title, sub }) => (
    <div className="h-full px-1 sm:px-2">
        <div className="flex h-full min-h-[220px] flex-col rounded-[1.25rem] bg-surface p-4 ring-1 ring-ink/5">
            <img
                src={image}
                alt=""
                loading="lazy"
                className="mb-3 h-32 w-full rounded-xl object-contain sm:h-36"
            />
            <p className="text-base font-semibold leading-snug text-ink">{title}</p>
            <p className="mt-2 line-clamp-3 text-sm text-mute">{sub}</p>
        </div>
    </div>
);
