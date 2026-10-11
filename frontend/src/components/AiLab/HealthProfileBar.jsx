import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { api } from "../../lib/api.js";
import {
    ageFromBirthYear,
    buildScreeningProfile,
    isProfileComplete,
} from "../../lib/healthProfile.js";
import { updateUserProfile } from "../../redux/user/userSlice.js";

export const HealthProfileBar = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const data = currentUser?.data;

    const [sex, setSex] = useState(data?.sex || "");
    const [birthYear, setBirthYear] = useState(
        data?.birthYear ? String(data.birthYear) : ""
    );
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(() => !isProfileComplete(currentUser));

    if (!currentUser) {
        return (
            <p className="rounded-[1.25rem] bg-canvas px-4 py-3 text-sm text-mute ring-1 ring-ink/10">
                <Link to="/signin" state={{ from: window.location.pathname }} className="text-canopy underline-offset-4 hover:underline">
                    Sign in
                </Link>{" "}
                to save sex and birth year once — guided intake will skip pregnancy questions for men and won&apos;t re-ask your age.
            </p>
        );
    }

    const profile = buildScreeningProfile(currentUser);
    const complete = isProfileComplete(currentUser);

    const save = async (e) => {
        e.preventDefault();
        setError("");
        if (!sex || !birthYear) {
            setError("Choose sex and birth year.");
            return;
        }
        setSaving(true);
        try {
            const { data: res } = await api.patch("/user/healthProfile", {
                sex,
                birthYear: Number(birthYear),
            });
            if (!res.status) {
                setError(res.message || "Could not save profile.");
                return;
            }
            dispatch(
                updateUserProfile({
                    ...currentUser,
                    data: res.data,
                })
            );
            setExpanded(false);
        } catch (err) {
            setError(err.response?.data?.message || "Could not save profile.");
        } finally {
            setSaving(false);
        }
    };

    if (complete && !expanded) {
        const age = ageFromBirthYear(data.birthYear);
        return (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] bg-canopy/5 px-4 py-3 text-sm text-ink ring-1 ring-canopy/20">
                <p>
                    Using your account:{" "}
                    <span className="font-medium capitalize">{data.sex}</span>
                    {age != null && (
                        <>
                            , age <span className="tabular-nums">{age}</span>
                        </>
                    )}
                    {profile?.skipPregnancy && " — pregnancy questions skipped"}
                </p>
                <button
                    type="button"
                    className="text-canopy underline-offset-4 hover:underline"
                    onClick={() => setExpanded(true)}
                >
                    Edit
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={save}
            className="rounded-[1.25rem] bg-surface p-4 ring-1 ring-ink/10"
        >
            <p className="text-sm text-mute">
                Google sign-in gives name and email only — save sex and birth year once for smarter AI Lab intake.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                    Sex
                    <select
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        className="mt-1 h-11 w-full rounded-xl border border-ink/10 bg-canvas px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    >
                        <option value="">Select…</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other / prefer not to say</option>
                    </select>
                </label>
                <label className="block text-sm">
                    Birth year
                    <input
                        type="number"
                        inputMode="numeric"
                        min={1900}
                        max={new Date().getFullYear()}
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        placeholder="1990"
                        className="mt-1 h-11 w-full rounded-xl border border-ink/10 bg-canvas px-3 tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy"
                    />
                </label>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-700" role="alert">
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={saving}
                className="mt-4 min-h-11 rounded-full bg-canopy px-5 text-sm font-medium text-white hover:bg-canopy-hover disabled:opacity-50"
            >
                {saving ? "Saving…" : "Save for screenings"}
            </button>
        </form>
    );
};
