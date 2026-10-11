import { Link } from "react-router-dom";

export const SiteFooter = () => (
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-10 pt-8 text-sm text-mute">
        <div className="flex flex-col gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p translate="no">DoctorPe</p>
            <nav aria-label="Footer" className="flex flex-wrap gap-4">
                <Link className="hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" to="/medicines">Medicines</Link>
                <Link className="hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" to="/AI_Lab">AI Lab</Link>
                <Link className="hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" to="/bookDoctor">Find doctors</Link>
            </nav>
        </div>
    </footer>
);
