import { Link } from "react-router-dom";

export const NotFound = () => (
    <section className="mx-auto flex min-h-[60dvh] max-w-xl flex-col justify-center px-4 py-24">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink">This page is not here</h1>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-mute">
            The address may be mistyped, or the page moved. Head home or open the medicine store.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
            <Link
                to="/"
                className="inline-flex min-h-11 items-center rounded-full bg-canopy px-5 py-2 text-white hover:bg-canopy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
            >
                Go home
            </Link>
            <Link
                to="/medicines"
                className="inline-flex min-h-11 items-center rounded-full border border-ink/15 px-5 py-2 text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
            >
                Browse medicines
            </Link>
        </div>
    </section>
);
