import { useState } from "react";
import { SignUpButton } from "@clerk/react";
import { useSignUp } from "@clerk/react/legacy";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import loginImg from "../../assets/images/login.jpg";
import logo from "../../assets/images/Logo.png";

export default function Signup() {
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      setErrorMsg("Authentication is still loading. Please try again.");
      setStatusMsg("");
      return;
    }

    setErrorMsg("");
    setStatusMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(
      "Checking security and sending your verification code. This can take a few seconds...",
    );

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      setStatusMsg("Almost there... taking you to the verification page.");

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      navigate("/verify");
    } catch (err) {
      setIsSubmitting(false);
      setStatusMsg("");
      setErrorMsg(err.errors?.[0]?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl mx-auto">
        {/* 🔗 LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 mb-6 px-2 w-fit hover:opacity-80 transition"
        >
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-semibold text-xl tracking-tight leading-tight">
            Cooks <br /> Delight
          </span>
        </Link>

        {/* CARD */}
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-300">
          {/* IMAGE */}
          <div className="hidden md:block w-full lg:w-[55%] h-87.5 lg:h-auto relative">
            <img
              src={loginImg}
              alt="cooking"
              className="w-full h-full object-cover object-[30%_center]"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* FORM */}
          <div className="w-full lg:w-[45%] bg-[#f5efe8] px-10 md:px-16 py-12 md:py-16 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl text-center font-extrabold mb-4">
              SIGN UP
            </h1>

            <p className="text-gray-600 mb-8 md:mb-10 text-base md:text-lg text-center leading-relaxed max-w-lg mx-auto">
              Join our community of food lovers and start your cooking journey
              today!
            </p>

            {/* FORM */}
            <form
              className="flex flex-col gap-5 max-w-lg mx-auto w-full"
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
            >
              {/* EMAIL */}
              <div>
                <label className="text-sm font-bold tracking-wide">EMAIL</label>
                <input
                  type="email"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={isSubmitting}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <label className="text-sm font-bold tracking-wide">
                  PASSWORD
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400 pr-12"
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-13.75 text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm font-bold tracking-wide">
                  CONFIRM PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={isSubmitting}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </div>

              <div id="clerk-captcha" className="w-full" />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={!isLoaded || isSubmitting}
                className="bg-orange-400 text-black py-4 rounded-3xl mt-4 text-lg font-semibold hover:bg-orange-500 transition"
              >
                {isSubmitting
                  ? "CREATING ACCOUNT..."
                  : isLoaded
                    ? "CREATE ACCOUNT"
                    : "LOADING..."}
              </button>

              {statusMsg && (
                <p className="text-sm text-center text-gray-600">{statusMsg}</p>
              )}

              {/* ERROR */}
              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}
            </form>

            {/* CLERK BUTTON */}
            <div className="max-w-lg mx-auto w-full mt-4">
              <SignUpButton mode="modal">
                <button
                  disabled={isSubmitting}
                  className="w-full border border-black py-4 rounded-3xl text-lg font-semibold hover:bg-gray-100 transition disabled:opacity-60"
                >
                  CONTINUE WITH EMAIL
                </button>
              </SignUpButton>
            </div>

            {/* DIVIDER */}
            <div className="my-6 md:my-8 border-t border-gray-800 w-full max-w-lg mx-auto"></div>

            {/* LOGIN LINK */}
            <p className="text-base text-center max-w-lg mx-auto">
              ALREADY HAVE AN ACCOUNT?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-400 font-medium cursor-pointer underline"
              >
                LOG IN
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
