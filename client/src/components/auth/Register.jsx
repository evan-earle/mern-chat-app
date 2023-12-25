import { useState } from "react";
import axios from "axios";
import Night from "../../assets/night.jpg";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

export const Register = ({ authType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState("");

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (previewSource) {
        uploadImage(previewSource, email);
      }
      setTimeout(() => {
        setLoading(false);
        toast.success("Registered");
        authType("login");
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        if (err.response.data.message === "User already exists") {
          toast.error("User already exists");
        } else {
          toast.error("Registration failed");
        }
      }, 1500);
    }
  };

  const uploadImage = async (base64EncodedImage, email) => {
    try {
      const data = await axios("/api/auth/upload", {
        method: "POST",
        data: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });

      const photo = data.data.url;
      await axios.post(`/api/auth/storePhoto`, {
        email,
        photo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-full h-screen flex items-center  flex-col py-6 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url(${Night})` }}
    >
      <h1 className=" w-1/3 flex justify-center mb-3 p-4 rounded  bg-slate-50 text-3xl">
        Chat App
      </h1>
      <form className="w-1/3 bg-slate-50 rounded p-4" onSubmit={onSubmit}>
        <div className="flex justify-evenly w-full ">
          <h3
            onClick={() => authType("login")}
            className={`text-center p-2  w-3/5 rounded-full cursor-pointer`}
          >
            Login
          </h3>
          <h3
            className={` text-center p-2 w-3/5 rounded-full cursor-pointer  ${
              authType !== "register" ? " bg-blue-200" : null
            }`}
          >
            Register
          </h3>
        </div>

        <div className="flex flex-col mt-5 ">
          <div>
            <label htmlFor="username">Name</label>
            <span className="text-red-500"> *</span>
          </div>
          <input
            className="mt-2 w-full p-2 border-2 rounded"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col mt-3 ">
          <div>
            <label htmlFor="username">Email Address</label>
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
          <input
            className="mt-2 w-full p-2 border-2 rounded"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button
            className="-ml-12 bg-slate-200 p-1 rounded text-xs w-10"
            onClick={handleShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="mt-3">
          <div>
            <label htmlFor="password">Confirm Password</label>
            <span className="text-red-500"> *</span>
          </div>
          <div className>
            <input
              className="mt-2 w-full p-2 border-2 rounded"
              required
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
            <button
              className="-ml-12 bg-slate-200 p-1 rounded text-xs w-10"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <label htmlFor="password">Upload Profile Photo</label>
          </div>
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            className="mt-2 w-full p-2 "
          />
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
              ariaLabel="oval-loading"
              wrapperStyle={{ justifyContent: "center" }}
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};
