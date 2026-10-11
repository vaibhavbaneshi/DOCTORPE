export const ageFromBirthYear = (birthYear) => {
    if (!birthYear) return null;
    const age = new Date().getFullYear() - Number(birthYear);
    return age > 0 && age < 130 ? age : null;
};

/** Heart ML model: 0 = female, 1 = male */
export const heartMlSex = (sex) => {
    if (sex === "female") return "0";
    if (sex === "male") return "1";
    return "";
};

export const buildScreeningProfile = (currentUser) => {
    const data = currentUser?.data;
    if (!data) return null;

    const age = ageFromBirthYear(data.birthYear);
    const sex = data.sex || "";

    return {
        firstName: data.firstName,
        sex,
        age,
        skipPregnancy: sex === "male",
        mlSex: heartMlSex(sex),
    };
};

export const seedCollectedFromProfile = (screening, profile) => {
    if (!profile) return {};

    if (screening === "diabetes") {
        const collected = {};
        if (profile.age != null) collected.Age = profile.age;
        if (profile.skipPregnancy) collected.Pregnancies = 0;
        return collected;
    }

    return {};
};

export const applyDiabetesPayload = (payload, profile) => {
    const out = { ...payload };
    if (profile?.age != null && (out.Age === "" || out.Age === undefined)) {
        out.Age = profile.age;
    }
    if (profile?.skipPregnancy) {
        out.Pregnancies = 0;
    }
    return out;
};

export const profileContextForApi = (profile) => {
    if (!profile) return null;
    return {
        firstName: profile.firstName,
        sex: profile.sex || undefined,
        age: profile.age ?? undefined,
        skipPregnancy: profile.skipPregnancy || undefined,
    };
};

export const isProfileComplete = (currentUser) => {
    const data = currentUser?.data;
    if (!data) return false;
    return Boolean(data.sex && data.birthYear);
};
