import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

const GOOGLE_CLIENT_ID="967069752496-g5djvqjpgfaagu61nh698120727o5qf2.apps.googleusercontent.com";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // --------------------
  // Manual Login
  // --------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        alert(`Welcome ${data.user.firstName || data.user.name}`);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  };

  // --------------------
  // Google Login
  // --------------------
  useEffect(() => {
    /* global google */
    const handleGoogleResponse = async (response) => {
      try {
        console.log("Google token:", response.credential);

        const res = await fetch("http://localhost:5000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        console.log("Backend response:", data);

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", data.user.email);

          alert(`Welcome ${data.user.firstName}`);
          navigate("/dashboard");
        } else {
          alert(data.error || "Google login failed");
        }
      } catch (err) {
        console.error("Google login error:", err);
        alert("Google login error");
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      const container = document.getElementById("google-login-btn");
      const containerWidth = container ? Math.floor(container.clientWidth) : 320;
      const buttonWidth = Math.max(260, Math.min(containerWidth, 480));

      google.accounts.id.renderButton(container, {
        type: "standard",
        theme: "filled_white",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: buttonWidth,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <div className="w-[300px] md:w-[500px] h-auto bg-white rounded-md shadow-md">
        <div className="form-details p-4 flex flex-col ">
          <h1 className="text-center font-pacifico text-lg cursor-pointer">Notify</h1>
          <h1 className="text-xl font-semibold pt-4">Welcome</h1>
          <p className="pt-2 text-xs text-gray-400">Take notes and organize your thoughts</p>

          <div className="inputs flex flex-col gap-4 pt-2">
            <input type="email" placeholder="Enter your Email" className="border rounded text-sm p-2 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your Password" className="border rounded text-sm p-2 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="flex flex-col items-center">
              <button className="flex justify-end text-xs gap-2">
                Don't have an account ?{" "}
                <a href="/signup" className="text-blue-600 underline">SignUp</a>
              </button>
              <button className="flex justify-end text-xs text-blue-600 underline"><a href="/forgot">Forgot Password ?</a></button>
            </div>

            <div className="flex justify-center"><button onClick={handleLogin} className=" rounded p-2 text-sm w-[85%] font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300">Login</button></div>
            
          </div>

          <div className="divider flex justify-center items-center gap-2 pt-2 text-sm text-gray-400">
            <div className="bg-gray-300 flex-1 h-px"></div>
            <div>OR</div>
            <div className="bg-gray-300 flex-1 h-px"></div>
          </div>

          {/* Google Sign-In */}
          <div id="google-login-btn" className="google-signUp w-full flex justify-center items-center pt-2 "></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
