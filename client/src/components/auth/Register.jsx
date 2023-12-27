import { useState } from "react";
import axios from "axios";

export const Register = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const onSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       await axios.post("/api/auth/register", {
  //         username,
  //         password,
  //       });
  //       // toast.success("Registered");
  //       authType("signin");
  //     } catch (err) {
  //       console.log(err);
  //       if (err.response.data.message === "User already exists") {
  //         //   toast.error("User already exists");
  //       } else {
  //         //   toast.error("Registration failed");
  //       }
  //     }
  //   };

  return (
    <div className>
      <form className onSubmit>
        <div className>
          <h3 className>Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className onClick={() => authType("signin")}>
              Sign In
            </span>
          </div>
          <div className>
            <label htmlFor="username">Username</label>
            <input
              className
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className>
            <label htmlFor="password">Password</label>
            <input
              className
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className>
            <button className type="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
