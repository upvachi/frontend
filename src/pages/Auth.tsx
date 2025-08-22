import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import LeftIllustration from "../components/auth/LeftIllustration";
import RightForm from "../components/auth/RightForm";
import upvachiLogo from "../assets/images/upvachi.png"

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.pathname.endsWith("signup") ? "signup" : "login";
  const [isLogin, setIsLogin] = useState<boolean>(mode === "login");

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center rounded-3xl bg-transparent p-4 md:p-6 relative overflow-hidden min-h-screen">

      {/* Logo pinned top-left */}
      <div
        className="flex items-center gap-2 absolute top-4 left-4 z- group cursor-pointer lg:hidden"
        onClick={() => navigate("/")}
      >
        <img
          src={upvachiLogo}
          className="w-12 h-12 border-2 border-[#1a2a4f] rounded-xl shadow-inner shadow-[#0b1936]/40 transition duration-300 group-hover:scale-110"
          alt="UpVachi Logo"
        />
        <h1 className="text-xl font-extrabold text-white drop-shadow-lg">
          UpVachi
        </h1>
      </div>

      {/* Auth grid */}
      <div className="grid w-full lg:grid-cols-2 items-stretch">
        <LeftIllustration />
        <RightForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default Auth;
