import React from "react";
import * as LoginContext from './LoginContext'; // Reusing styled components
import './style.css'; // Shared styles

function AdminLogin() {
    const [isAdminSignIn, toggleAdmin] = React.useState(true);

    return (
        <LoginContext.PageWrapper> {/* Wrapping the entire container */}
            <LoginContext.Container>
                <LoginContext.SignUpContainer signinIn={isAdminSignIn}>
                    <LoginContext.Form>
                        <LoginContext.Title>Create Admin Account</LoginContext.Title>
                        <LoginContext.Input type="text" placeholder="Admin Name" />
                        <LoginContext.Input type="email" placeholder="Admin Email" />
                        <LoginContext.Input type="password" placeholder="Password" />
                        <LoginContext.Button>Sign Up</LoginContext.Button>
                    </LoginContext.Form>
                </LoginContext.SignUpContainer>

                <LoginContext.SignInContainer signinIn={isAdminSignIn}>
                    <LoginContext.Form>
                        <LoginContext.Title>Admin Sign In</LoginContext.Title>
                        <LoginContext.Input type="email" placeholder="Admin Email" />
                        <LoginContext.Input type="password" placeholder="Password" />
                        <LoginContext.Anchor href="#">Forgot your password?</LoginContext.Anchor>
                        <LoginContext.Button>Sign In</LoginContext.Button>
                    </LoginContext.Form>
                </LoginContext.SignInContainer>

                <LoginContext.OverlayContainer signinIn={isAdminSignIn}>
                    <LoginContext.Overlay signinIn={isAdminSignIn}>
                        <LoginContext.LeftOverlayPanel signinIn={isAdminSignIn}>
                            <LoginContext.Title>Welcome Back, Admin!</LoginContext.Title>
                            <LoginContext.Paragraph>
                                To stay connected with us, please log in with your admin credentials.
                            </LoginContext.Paragraph>
                            <LoginContext.GhostButton onClick={() => toggleAdmin(true)}>
                                Sign In
                            </LoginContext.GhostButton>
                        </LoginContext.LeftOverlayPanel>

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
