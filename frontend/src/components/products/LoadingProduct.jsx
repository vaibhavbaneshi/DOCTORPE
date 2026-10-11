const LoadingProduct = () => {
    return (
        <div className="animate-pulse rounded-[1.6rem] bg-surface p-4 ring-1 ring-ink/5">
            <div className="aspect-[4/3] rounded-[1.25rem] bg-ink/10" />
            <div className="mt-5 h-5 w-3/4 rounded-full bg-ink/10" />
            <div className="mt-3 h-7 w-1/2 rounded-full bg-ink/10" />
            <div className="mt-3 h-4 w-2/3 rounded-full bg-ink/10" />
            <div className="mt-6 h-11 w-full rounded-full bg-canopy/15" />
        </div>
    );
};

export default LoadingProduct;