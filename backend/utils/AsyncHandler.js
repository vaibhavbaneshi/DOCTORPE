
export const AsyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res.status(error.status || error.code || 500).json({
            status: false,
            success: false,
            message: error.message
        })
    }
}