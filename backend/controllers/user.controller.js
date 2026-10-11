import { User } from "../model/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const ALLOWED_SEX = new Set(["male", "female", "other", ""]);

export const updateHealthProfile = AsyncHandler(async (req, res) => {
    const { sex, birthYear } = req.body;
    const update = {};

    if (sex !== undefined) {
        if (!ALLOWED_SEX.has(sex)) {
            return res.status(400).json({
                status: false,
                message: "sex must be male, female, other, or empty",
            });
        }
        update.sex = sex;
    }

    if (birthYear !== undefined && birthYear !== null && birthYear !== "") {
        const year = Number(birthYear);
        const maxYear = new Date().getFullYear();
        if (!Number.isInteger(year) || year < 1900 || year > maxYear) {
            return res.status(400).json({
                status: false,
                message: "birthYear must be a valid year",
            });
        }
        update.birthYear = year;
    }

    if (!Object.keys(update).length) {
        return res.status(400).json({
            status: false,
            message: "Provide sex and/or birthYear to update",
        });
    }

    const user = await User.findByIdAndUpdate(req.userId, update, {
        new: true,
        runValidators: true,
    }).select("-password");

    if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
    }

    res.json({ status: true, data: user });
});
