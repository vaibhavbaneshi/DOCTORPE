 const DoctorLoadingCard = () => {
    return (
        <div className="animate-pulse overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-ink/5">
            <div className="h-48 bg-ink/10" />
            <div className="p-5">
                <div className="h-5 w-3/4 rounded-full bg-ink/10" />
                <div className="mt-3 h-4 w-1/2 rounded-full bg-ink/10" />
                <div className="mt-3 h-4 w-2/3 rounded-full bg-ink/10" />
                <div className="mt-5 h-11 rounded-full bg-canopy/15" />
            </div>
        </div>
    );
};

export default DoctorLoadingCard;