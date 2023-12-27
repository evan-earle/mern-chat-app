import { useState, useNavigate } from "react";
import axios from "axios";

export const Login = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const navigate = useNavigate();

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await axios.post("/api/auth/login", {
  //         username,
  //         password,
  //       });
  //       const firstLogin = await axios.get("/api/users/me");
  //       firstLogin.data.firstLogin === true ? navigate("/search") : navigate("/");
  //       // toast.success("Signed in");
  //       await axios.put("/api/users/firstLogin");
  //     } catch (err) {
  //       console.log(err);
  //       // toast.error("Signin failed");
  //     }
  //   };

  return (
    <div className="min-h-full h-screen flex items-center justify-center flex-col py-12 px-4 sm:px-6 lg:px-8 ">
      <h1 className=" w-2/5 flex justify-center mb-5 p-2 rounded">Chat App</h1>
      <form
        className="w-2/5 h-10 items-center border-green-900 border-2"
        onSubmit
      >
        <div className>
          <h3 className>Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className onClick={() => authType("signup")}>
              Sign Up
            </span>
          </div>
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              className=""
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              className=""
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="">
            <button className="" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
