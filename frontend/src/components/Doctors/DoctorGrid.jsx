import { DoctorCard } from "../Card/DoctorCard";
import DoctorLoadingCard from "../Card/DoctorLoadingCard";

export const DoctorGrid = ({ doctors, loading, onSelect, label }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <DoctorLoadingCard key={index} />
                ))}
            </div>
        );
    }

    if (!doctors.length) {
        return (
            <p className="py-16 text-center text-slate-600">
                No doctors match this specialty. Try another filter.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((user) => (
                <DoctorCard
                    key={user._id}
                    onClick={() => onSelect(user)}
                    name={user.fullname}
                    email={user.email}
                    description="Verified specialist"
                    speciality={user.speciality}
                    label={label}
                />
            ))}
        </div>
    );
};
