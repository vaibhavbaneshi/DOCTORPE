const DEFAULT_SPECIALTIES = [
    "ALL",
    "CARDIOLOGY",
    "ORTHOPEDICS",
    "CONCOLOGY",
    "DERMATOLOGY",
    "SURGERY",
];

export const SpecialtyFilter = ({
    selected,
    onChange,
    specialties = DEFAULT_SPECIALTIES,
}) => {
    return (
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/10" aria-label="Filter by specialty">
            {specialties.map((specialty) => (
                <button
                    key={specialty}
                    type="button"
                    aria-pressed={selected === specialty}
                    className={`min-h-11 border-b-2 px-1 py-3 text-sm font-medium transition-colors duration-200 ease-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy ${
                        selected === specialty
                            ? "border-canopy text-canopy"
                            : "border-transparent text-mute hover:text-ink"
                    }`}
                    onClick={() => onChange(specialty)}
                >
                    {specialty === "CONCOLOGY" ? "ONCOLOGY" : specialty}
                </button>
            ))}
        </div>
    );
};
