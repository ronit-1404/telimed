import React, { useContext, useState } from "react";
import axios from "axios";
import * as LoginContext from "./LoginContext"; // Styled components
import "./style.css"; // Shared styles
import { AdminContext } from "../context/AdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

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
            // Here email and password are sent in the request body
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
            if (data.success) {
                console.log("Login successful, token:", data.token);
                // Save token in local storage so that when we refresh the page, the admin can still be logged in
                localStorage.setItem("aToken", data.token);
                setatoken(data.token); // Save token in context
                toast.success("Login successful!"); // Show success toast
            } else {
                toast.error(data.message); // Show error toast for invalid credentials
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("An error occurred during login. Please try again."); // Show error toast for request failure
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
            <ToastContainer /> {/* Include ToastContainer for displaying notifications */}
        </LoginContext.PageWrapper>
    );
}

export default AdminLogin;
