import { useState, useNavigate } from "react";
import axios from "axios";
import Night from "../../assets/night.jpg";

export const Login = ({ authType }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

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
    <div
      className="min-h-full h-screen flex items-center  flex-col py-6 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url(${Night})` }}
    >
      <h1 className=" w-1/3 flex justify-center mb-3 p-4 rounded  bg-slate-50 text-3xl">
        Chat App
      </h1>
      <form className="w-1/3 bg-slate-50 rounded p-4" onSubmit>
        <div className="flex justify-evenly w-full ">
          <h3
            className={`text-center p-2  w-3/5 rounded-full cursor-pointer  ${
              authType !== "login" ? " bg-blue-200" : null
            }`}
          >
            Login
          </h3>
          <h3
            onClick={() => authType("register")}
            className=" text-center p-2 w-3/5 rounded-full cursor-pointer "
          >
            Register
          </h3>
        </div>

        <div className="flex flex-col mt-5 ">
          <div>
            <label htmlFor="email">Email Address</label>
            <span className="text-red-500"> *</span>
          </div>
          <input
            className="mt-2 w-full p-2 border-2 rounded"
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>
        <div className="mt-3">
          <div>
            <label htmlFor="password">Password</label>
            <span className="text-red-500"> *</span>
          </div>
          <div>
            <input
              className="mt-2 w-full p-2 border-2 rounded"
              required
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button
              className="-ml-12 bg-slate-200 p-1 rounded text-xs w-10"
              onClick={showPassword}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mt-4 w-full rounded  p-2 text-center bg-blue-500 text-white">
          <button className="" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
