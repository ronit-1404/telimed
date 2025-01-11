import React, { useState, useContext } from "react";
import axios from "axios"; // Import axios for API calls
import * as Logincontext from "./LoginContext";
import { AppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function Login() {
  const [signIn, toggle] = useState(true); // State to toggle between sign-in and sign-up forms
  const [name,setName] = useState("");
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const { backendUrl, token, setToken } = useContext(AppContext); // Context for backend URL and token management

  const onSubmitloginHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token); // Save token in local storage
        setToken(data.token); // Save token in context
        toast.success("Login successful!"); // Show success toast
      } else {
        toast.error(data.message || "Invalid credentials"); // Show error toast for invalid credentials
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message); // Log error details
      toast.error(
        error.response?.data?.message || "An error occurred during login. Please try again."
      ); // Show error toast
    }
  };

  const onSubmitRegisterHandler = async (event) => {
    event.preventDefault();
    
    try {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {name,email,password});
        if(data.success){
            localStorage.setItem("aToken",data.token);
            setToken(data.token);
            toast.success("Restration Successfull!");
        }else{
            toast.error(data.message || "Invalid credentials")
        }
    } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message); // Log error details
      toast.error(
        error.response?.data?.message || "An error occurred during login. Please try again."
      ); 
    }
  }

  return (
    <Logincontext.PageWrapper>
      <Logincontext.Container>
        {/* Sign-Up Form */}
        <Logincontext.SignUpContainer signinIn={signIn}>
          <Logincontext.Form onSubmit={onSubmitRegisterHandler}>
            <Logincontext.Title>Create Account</Logincontext.Title>
            <Logincontext.Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
            <Logincontext.Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <Logincontext.Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <Logincontext.Button>Sign Up</Logincontext.Button>
          </Logincontext.Form>
        </Logincontext.SignUpContainer>

        {/* Sign-In Form */}
        <Logincontext.SignInContainer signinIn={signIn}>
          <Logincontext.Form onSubmit={onSubmitloginHandler}>
            <Logincontext.Title>Sign in</Logincontext.Title>
            <Logincontext.Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <Logincontext.Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <Logincontext.Anchor href="#">Forgot your password?</Logincontext.Anchor>
            <Logincontext.Button type="submit">Sign In</Logincontext.Button>
          </Logincontext.Form>
        </Logincontext.SignInContainer>

        {/* Overlay */}
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
                Enter Your personal details and start your journey with us
              </Logincontext.Paragraph>
              <Logincontext.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Logincontext.GhostButton>
            </Logincontext.RightOverlayPanel>
          </Logincontext.Overlay>
        </Logincontext.OverlayContainer>
      </Logincontext.Container>
      <ToastContainer /> {/* Toastify container for notifications */}
    </Logincontext.PageWrapper>
  );
}

export default Login;
