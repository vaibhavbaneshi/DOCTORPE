export const ArticleCard = ({ title, image, sub, category }) => (
    <article className="w-full cursor-pointer text-left">
        <div className="aspect-[7/5] w-full overflow-hidden rounded-[1.25rem] ring-1 ring-ink/5">
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-canopy">{category}</p>
        <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{title}</h3>
        <p className="mt-2 text-sm text-mute">{sub}</p>
    </article>
);
