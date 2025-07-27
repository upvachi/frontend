import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

import LeftIllustration from "../components/auth/LeftIllustration";
import RightForm from "../components/auth/RightForm";

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.pathname.endsWith("signup") ? "signup" : "login";

  const [isLogin, setIsLogin] = useState(mode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm password is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    console.log(isLogin ? "Login successful" : "Signup successful", formData);
  };

  const switchMode = () => {
    if (isLogin) {
      setIsLogin(false);
      navigate("/auth/signup");
    } else {
      setIsLogin(true);
      navigate("/auth/login");
    }

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen w-full h-full max-w-6xl mx-auto p-4 md:p-6 grid lg:grid-cols-2 items-center justify-center bg-transparent rounded-3xl overflow-hidden relative">
      {/* Left Side - Premium Illustration */}
      <LeftIllustration />

      {/* Right Side - Authentication Form */}
      <RightForm
        isLogin={isLogin}
        handleInputChange={handleInputChange}
        formData={formData}
        errors={errors}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        switchMode={switchMode}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default Auth;
