import jwt from 'jsonwebtoken'

//admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Extract the token from Authorization header
        const authHeader = req.headers.authorization;

        // Check if the token is missing
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        // Get the token after "Bearer "
        const admintoken = authHeader.split(' ')[1];

        // Verify and decode the token
        const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET);

        // Check if the email in token matches the admin email
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authAdmin;