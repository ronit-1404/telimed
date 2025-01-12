import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const {token} = req.headers

        // Check if the token is missing or improperly formatted
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the email in token matches the admin email
        // if (decodedToken.email !== process.env.ADMIN_EMAIL) {
        //     return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        // }

        // Attach the user ID from the token to the request body
        req.body.userId = decodedToken.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Not Authorized. Invalid Token" });
    }
};

export default authUser;
