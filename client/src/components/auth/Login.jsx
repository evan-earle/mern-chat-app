import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Night from "../../assets/night.jpg";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { ChatState } from "../../context/ChatProvider";

export const Login = ({ authType }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const { setUser } = ChatState();

  const showPassword = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    if (email === "guest@account.com") {
      setGuestLoading(true);
    } else {
      setLoading(true);
    }
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setUser(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setTimeout(() => {
        setLoading(false);
        setGuestLoading(false);
        toast.success("Logged in");
        navigate("/chats");
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setGuestLoading(false);
        toast.error("Login failed");
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-full h-screen flex items-center flex-col py-6 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover bg-center  "
      style={{ backgroundImage: `url(${Night})` }}
    >
      <h1 className=" w-1/3 flex justify-center mb-3 p-4 rounded bg-slate-50 text-3xl max-lg:w-2/3 max-sm:w-full">
        Skyward
      </h1>
      <form
        className="w-1/3 bg-slate-50 rounded p-4 max-lg:w-2/3 max-sm:w-full"
        onSubmit={onSubmit}
      >
        <div className="flex justify-evenly w-full ">
          <h3
            className={`text-center p-2 w-3/5 rounded-full cursor-pointer  ${
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
            className="mt-2 w-full p-2 border-2 focus:outline-none focus:border-blue-400 rounded"
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
              className="mt-2 w-full p-2 border-2 rounded focus:outline-none focus:border-blue-400"
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
        <button
          className="mt-4 w-full rounded  p-2 text-center bg-blue-500 text-white"
          type="submit"
        >
          {loading ? (
            <Oval
              visible={true}
              height="30"
              width="30"
              color="white"
              secondaryColor="grey"
              ariaLabel="oval-loading"
              wrapperStyle={{ justifyContent: "center" }}
            />
          ) : (
            "Login"
          )}
        </button>
        <button
          className="mt-2 w-full rounded  p-2 text-center bg-slate-500 text-white"
          onClick={() => {
            setEmail("guest@account.com");
            setPassword("123");
          }}
        >
          {guestLoading ? (
            <Oval
              visible={true}
              height="30"
              width="30"
              color="white"
              secondaryColor="grey"
              ariaLabel="oval-loading"
              wrapperStyle={{ justifyContent: "center" }}
            />
          ) : (
            "Login as Guest"
          )}
        </button>
      </form>
    </div>
  );
};
