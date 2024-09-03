async function isValidPrem (req, res, next) {
    try {
        const { role } = req.session
        if (role === 2) {
            return next();
        }
        const error = new Error("This user is not PREM");
        error.statusCode = 403; 
        throw error;
    } catch (error) {
        return next (error);
    }
}

export default isValidPrem;