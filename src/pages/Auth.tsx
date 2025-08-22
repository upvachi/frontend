import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import LeftIllustration from "../components/auth/LeftIllustration";
import RightForm from "../components/auth/RightForm";

export const Auth = () => {
  const location = useLocation();

  const mode = location.pathname.endsWith("signup") ? "signup" : "login";

  const [isLogin, setIsLogin] = useState<boolean>(mode === "login");

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center rounded-3xl bg-transparent p-4 md:p-6 lg:grid-cols-2 relative overflow-hidden">
  
      <div className="grid w-full lg:grid-cols-2 items-center">
        {/* Left Side - Premium Illustration */}
        <LeftIllustration />
  
        {/* Right Side - Authentication Form */}
        <RightForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
  
};

export default Auth;
