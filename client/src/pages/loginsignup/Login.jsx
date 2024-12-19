import React from "react";
import * as Logincontext from './LoginContext';

function Login() {
    const [signIn, toggle] = React.useState(true);
    return (
        <Logincontext.PageWrapper> {/* Wrapping the entire container */}
            <Logincontext.Container>
                <Logincontext.SignUpContainer signinIn={signIn}>
                    <Logincontext.Form>
                        <Logincontext.Title>Create Account</Logincontext.Title>
                        <Logincontext.Input type='text' placeholder='Name' />
                        <Logincontext.Input type='email' placeholder='Email' />
                        <Logincontext.Input type='password' placeholder='Password' />
                        <Logincontext.Button>Sign Up</Logincontext.Button>
                    </Logincontext.Form>
                </Logincontext.SignUpContainer>

                <Logincontext.SignInContainer signinIn={signIn}>
                    <Logincontext.Form>
                        <Logincontext.Title>Sign in</Logincontext.Title>
                        <Logincontext.Input type='email' placeholder='Email' />
                        <Logincontext.Input type='password' placeholder='Password' />
                        <Logincontext.Anchor href='#'>Forgot your password?</Logincontext.Anchor>
                        <Logincontext.Button>Sign In</Logincontext.Button>
                    </Logincontext.Form>
                </Logincontext.SignInContainer>

                <Logincontext.OverlayContainer signinIn={signIn}>
                    <Logincontext.Overlay signinIn={signIn}>
                        <Logincontext.LeftOverlayPanel signinIn={signIn}>
                            <Logincontext.Title>Welcome Back!</Logincontext.Title>
                            <Logincontext.Paragraph>
                                To keep connected with us please login with your personal info
                            </Logincontext.Paragraph>
                            <Logincontext.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Logincontext.GhostButton>
                        </Logincontext.LeftOverlayPanel>

                        <Logincontext.RightOverlayPanel signinIn={signIn}>
                            <Logincontext.Title>Hello, Friend!</Logincontext.Title>
                            <Logincontext.Paragraph>
                                Enter Your personal details and start journey with us
                            </Logincontext.Paragraph>
                            <Logincontext.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Logincontext.GhostButton>
                        </Logincontext.RightOverlayPanel>
                    </Logincontext.Overlay>
                </Logincontext.OverlayContainer>
            </Logincontext.Container>
        </Logincontext.PageWrapper>
    );
}

export default Login;
