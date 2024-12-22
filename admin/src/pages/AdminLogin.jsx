import React, { useContext, useState } from "react";
import axios from "axios";
import * as LoginContext from "./LoginContext"; // Styled components
import "./style.css"; // Shared styles
import { AdminContext } from "../context/AdminContext";

function AdminLogin() {
    const [isAdminSignIn, toggleAdmin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setatoken, backendUrl } = useContext(AdminContext); // Context for backend URL and token setter

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log("Submitting to:", `${backendUrl}/api/admin/login`);
        console.log("Email:", email, "Password:", password);

        try {
            //here email and password are send in req body
            //await is used to wait for the promise returned by axios.post to resolve.
            //This means the code execution will pause here until the POST request completes and a response is received.
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
            if (data.success) {
                console.log("Login successful, token:", data.token);
                setatoken(data.token); // Save token in context
            } else {
                console.error("Login failed, response:", data);
            }
            //The frontend collects the admin's email and password through a form.
            // The axios.post sends these credentials to the backend API.
            // The backend checks the credentials and responds:
            // On success: Returns a JSON object with admin details and an authentication token.
            // On failure: Returns an error message (e.g., "Invalid credentials").
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <LoginContext.PageWrapper>
            <LoginContext.Container>
                {/* Sign-Up Form */}
                <LoginContext.SignUpContainer signinIn={isAdminSignIn}>
                    <LoginContext.Form onSubmit={onSubmitHandler}>
                        <LoginContext.Title>Create Admin Account</LoginContext.Title>
                        <LoginContext.Input type="text" placeholder="Admin Name" />
                        <LoginContext.Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Admin Email"
                        />
                        <LoginContext.Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <LoginContext.Button>Sign Up</LoginContext.Button>
                    </LoginContext.Form>
                </LoginContext.SignUpContainer>

                {/* Sign-In Form */}
                <LoginContext.SignInContainer signinIn={isAdminSignIn}>
                    <LoginContext.Form onSubmit={onSubmitHandler}>
                        <LoginContext.Title>Admin Sign In</LoginContext.Title>
                        <LoginContext.Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Admin Email"
                        />
                        <LoginContext.Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <LoginContext.Anchor href="#">Forgot your password?</LoginContext.Anchor>
                        <LoginContext.Button>Sign In</LoginContext.Button>
                    </LoginContext.Form>
                </LoginContext.SignInContainer>

                {/* Overlay */}
                <LoginContext.OverlayContainer signinIn={isAdminSignIn}>
                    <LoginContext.Overlay signinIn={isAdminSignIn}>
                        {/* Left Panel */}
                        <LoginContext.LeftOverlayPanel signinIn={isAdminSignIn}>
                            <LoginContext.Title>Welcome Back, Admin!</LoginContext.Title>
                            <LoginContext.Paragraph>
                                To stay connected with us, please log in with your admin credentials.
                            </LoginContext.Paragraph>
                            <LoginContext.GhostButton onClick={() => toggleAdmin(true)}>
                                Sign In
                            </LoginContext.GhostButton>
                        </LoginContext.LeftOverlayPanel>

                        {/* Right Panel */}
                        <LoginContext.RightOverlayPanel signinIn={isAdminSignIn}>
                            <LoginContext.Title>Hello, Admin!</LoginContext.Title>
                            <LoginContext.Paragraph>
                                Enter your details and start managing your platform effectively.
                            </LoginContext.Paragraph>
                            <LoginContext.GhostButton onClick={() => toggleAdmin(false)}>
                                Sign Up
                            </LoginContext.GhostButton>
                        </LoginContext.RightOverlayPanel>
                    </LoginContext.Overlay>
                </LoginContext.OverlayContainer>
            </LoginContext.Container>
        </LoginContext.PageWrapper>
    );
}

export default AdminLogin;
