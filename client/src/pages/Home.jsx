import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { useState, useNavigate, useEffect } from "react";
import userAuth from "../hooks/useAuth";

export const Home = () => {
  const [authType, setAuthType] = useState("login");
  const { auth } = userAuth();
  // const navigate = useNavigate();

  const changeAuthType = (auth) => {
    setAuthType(auth);
  };

  // useEffect(() => {
  //   if (auth) {
  //     navigate("/chats");
  //   }
  // }, [auth, navigate]);

  if (authType === "login") {
    return (
      <div className="auth">
        <Login authType={changeAuthType} />
      </div>
    );
  } else {
    return (
      <div className="auth">
        <Register authType={changeAuthType} />
      </div>
    );
  }
};
