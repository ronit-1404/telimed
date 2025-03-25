import React, { useState, useContext, useEffect } from "react";
import axios from "axios"; 
import { AppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";
import { 
  PageWrapper, Container, SignUpContainer, SignInContainer, 
  OverlayContainer, Overlay, LeftOverlayPanel, RightOverlayPanel, 
  GhostButton, Title, Paragraph, Input, Button, Form, Anchor
} from "./LoginContext"; 

function Login() {
  const [signIn, setSignIn] = useState(true); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const { backendUrl, token, setToken } = useContext(AppContext); 
  const navigate = useNavigate();

  const onSubmitLoginHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setToken(data.token);
        toast.success("Login successful!");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const onSubmitRegisterHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setToken(data.token);
        toast.success("Registration Successful!");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]); 

  return (
    <PageWrapper>
      <Container>
        {/* Sign-Up Form */}
        <SignUpContainer signinIn={signIn}>
          <Form onSubmit={onSubmitRegisterHandler}>
            <Title>Create Account</Title>
            <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required />
            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
            <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <Button type="submit">Sign Up</Button>
          </Form>
        </SignUpContainer>

        {/* Sign-In Form */}
        <SignInContainer signinIn={signIn}>
          <Form onSubmit={onSubmitLoginHandler}>
            <Title>Sign in</Title>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
            <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <Anchor href="#">Forgot your password?</Anchor>
            <Button type="submit">Sign In</Button>
          </Form>
        </SignInContainer>

        {/* Overlay */}
        <OverlayContainer signinIn={signIn}>
          <Overlay signinIn={signIn}>
            <LeftOverlayPanel signinIn={signIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us, please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => setSignIn(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel signinIn={signIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter your personal details and start your journey with us
              </Paragraph>
              <GhostButton onClick={() => setSignIn(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
      <ToastContainer />
    </PageWrapper>
  );
}

export default Login;
