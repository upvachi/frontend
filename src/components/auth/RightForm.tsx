import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router"
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  [key: string]: string;
}


const RightForm = ({ isLogin, setIsLogin }: { isLogin: boolean, setIsLogin: (value: boolean) => void }) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const registrationSteps = [
    { id: 1, title: "Personal Info", fields: ["fullName", "email"] },
    { id: 2, title: "OTP", fields: ["otp"] },
    { id: 3, title: "Password", fields: ["password", "confirmPassword"] }
  ];

  const totalSteps = isLogin ? 1 : registrationSteps.length;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Errors = {};

    if (isLogin) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      const currentStepData = registrationSteps[step - 1];

      currentStepData.fields.forEach(field => {
        if (field === "fullName" && !formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        }
        if (field === "email") {
          if (!formData.email) {
            newErrors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
          }
        }
        if (field === "otp") {
          if (!formData.otp) {
            newErrors.otp = "OTP is required";
          } else if (formData.otp.length !== 6) {
            newErrors.otp = "Please enter a valid 6-digit OTP";
          }
        }
        if (field === "password") {
          if (!formData.password) {
            newErrors.password = "Password is required";
          } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
          }
        }
        if (field === "confirmPassword") {
          if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
          } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStepCompleted = (stepNumber: number) => {
    if (isLogin) return false;
    const stepData = registrationSteps[stepNumber - 1];
    return stepData.fields.every(field => formData[field as keyof FormData] && formData[field as keyof FormData].trim());
  };

  const handleNext = () => {
    if (currentStep === 1 && !isLogin) {
      // Simulate sending OTP when email is validated
      if (validateStep(currentStep)) {
        // Here you would normally send OTP to the email
        setOtpSent(true);
        setCurrentStep(currentStep + 1);
      }
    } else if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(isLogin ? "Login successful!" : "Account created successfully!");
    }, 2000);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setCurrentStep(1);
    setFormData({
      fullName: "",
      email: "",
      otp: "",
      password: "",
      confirmPassword: ""
    });
    setErrors({});
    setOtpSent(false);
    if (isLogin) {
      setIsLogin(false);
      navigate("/auth/signup");
    } else {
      setIsLogin(true);
      navigate("/auth/login");
    }
  };

  const handleResendOtp = () => {
    // Simulate resending OTP
    setOtpSent(true);
    setTimeout(() => {
      setOtpSent(false);
    }, 3000);
  };

  const renderStepContent = () => {
    if (isLogin) {
      return (
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`max-w-sm w-full px-4 py-3.5 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.email
                ? "border-red-500/50 bg-red-950/20"
                : "border-zinc-700/50 hover:border-zinc-600/50"
                }`}
              placeholder="you@company.com"
            />
            {errors.email && (
              <div className="h-5 mt-2 mx-2">
                <p className="text-red-400 text-xs">{errors.email}</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-zinc-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`max-w-sm w-full px-4 py-3.5 pr-12 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.password
                  ? "border-red-500/50 bg-red-950/20"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
                  }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="h-5 mt-2 mx-2">
                <p className="text-red-400 text-xs">{errors.password}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end text-sm">
            <button
              type="button"
              className="text-white hover:text-zinc-300 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>
        </div>
      );
    }

    // Registration steps
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-zinc-300 mb-2">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`max-w-sm w-full px-4 py-3.5 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.fullName
                  ? "border-red-500/50 bg-red-950/20"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
                  }`}
                placeholder="John Doe"
                autoFocus
              />
              {errors.fullName && (
                <div className="h-5 mt-2 mx-2">
                  <p className="text-red-400 text-xs">{errors.fullName}</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-zinc-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`max-w-sm w-full px-4 py-3.5 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.email
                  ? "border-red-500/50 bg-red-950/20"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
                  }`}
                placeholder="you@company.com"
              />
              {errors.email && (
                <div className="h-5 mt-2 mx-2">
                  <p className="text-red-400 text-xs">{errors.email}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {otpSent && (
              <div className="flex items-center justify-center mb-8">
                <p className="text-green-400 text-sm mr-2">
                  OTP sent to {formData.email}
                </p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-white hover:text-zinc-300 transition-colors text-sm font-medium"
                >
                  Resend
                </button>
              </div>
            )}
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-zinc-300 mb-2">
                Verification code
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                maxLength={6}
                className={`max-w-sm w-full px-4 py-3.5 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.otp
                  ? "border-red-500/50 bg-red-950/20"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
                  }`}
                placeholder="Enter 6-digit code"
                autoFocus
              />
              {errors.otp && (
                <div className="h-5 mt-2 mx-2">
                  <p className="text-red-400 text-xs">{errors.otp}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`max-w-sm w-full px-4 py-3.5 pr-12 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.password
                    ? "border-red-500/50 bg-red-950/20"
                    : "border-zinc-700/50 hover:border-zinc-600/50"
                    }`}
                  placeholder="Create a password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="h-5 mt-2 mx-2">
                  <p className="text-red-400 text-xs">{errors.password}</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-zinc-300 mb-2">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`max-w-sm w-full px-4 py-3.5 bg-zinc-950/60 border rounded-xl text-white text-sm placeholder-zinc-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-sm ${errors.confirmPassword
                  ? "border-red-500/50 bg-red-950/20"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
                  }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="h-5 mt-2 mx-2">
                  <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full lg:bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-4 lg:p-8 flex flex-col justify-center backdrop-blur-sm lg:border-l md:border-zinc-800/30 relative z-10 rounded-r-4xl">
      <div className="max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-mono tracking-tight">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {isLogin
              ? "Log in to your UpVachi account."
              : "Join UpVachi today — it's free."}
          </p>
        </div>

        {/* Form Content */}
        <div className="space-y-6 font-sans">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className={`flex items-center justify-between ${isLogin && "justify-center"} mt-8`}>
            {!isLogin && currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all duration-300 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className={`group transition-all duration-300 flex items-center justify-center font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-zinc-950 ${isLoading
                ? "w-12 h-12 p-0 rounded-full bg-white"
                : `${currentStep === 1 ? "w-full" : ""} px-6 py-3 rounded-full bg-white hover:bg-zinc-100 gap-3 hover:shadow-xl hover:scale-[1.02]`
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin
                    ? "Sign in"
                    : currentStep === totalSteps
                      ? "Create account"
                      : "Next"
                  }
                  {currentStep < totalSteps && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Switch Mode */}
        <div className="text-center mt-12">
          <p className="text-zinc-400 text-base">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchMode}
              className="text-white hover:text-zinc-300 transition-colors font-semibold ml-1"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {!isLogin && (
          <div className="mt-6 text-xs text-zinc-500 text-center leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="/terms" target="_blank" className="text-white hover:text-zinc-300 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" target="_blank" className="text-white hover:text-zinc-300 font-medium">
              Privacy Policy
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightForm;