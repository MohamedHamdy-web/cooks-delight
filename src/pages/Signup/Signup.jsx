import { useState } from "react";
import { useSignUp } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import loginImg from "../../assets/images/login.jpg";
import logo from "../../assets/images/Logo.png";

export default function Signup() {
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      // Create account
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification code sent to your email 📩");

      navigate("/verify"); // we will build this next 👀
    } catch (err) {
      const message = err.errors?.[0]?.message || "Signup failed";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl mx-auto">
        {/* BRAND */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-semibold text-xl tracking-tight">
            Cooks <br /> Delight
          </span>
        </div>

        {/* CARD */}
        <div className="flex rounded-3xl overflow-hidden border border-gray-300">
          {/* IMAGE */}
          <div className="w-[55%] hidden md:block">
            <img
              src={loginImg}
              alt="cooking"
              className="w-full h-full object-cover object-[30%_center]"
            />
          </div>

          {/* FORM */}
          <div className="w-full md:w-[55%] bg-[#f5efe8] px-16 py-16 flex flex-col justify-center">
            <h1 className="text-7xl text-center font-extrabold mb-4">
              SIGN UP
            </h1>

            <p className="text-gray-600 mb-10 text-lg text-center leading-relaxed max-w-lg">
              Create your account and start your cooking journey today.
            </p>

            <form
              className="flex flex-col gap-6 max-w-lg"
              onSubmit={handleSubmit}
            >
              {/* EMAIL */}
              <div>
                <label className="text-sm font-bold tracking-wide">EMAIL</label>
                <input
                  type="email"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[55px] text-gray-600 hover:text-black"
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
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </div>

              {/* BUTTON */}
              <button className="bg-orange-400 text-black py-4 rounded-3xl mt-4 text-lg font-semibold hover:bg-orange-500 transition">
                CREATE ACCOUNT
              </button>

              {/* ERROR */}
              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}
            </form>

            <div className="my-8 border-t border-gray-800 w-full max-w-lg"></div>

            <p className="text-base max-w-lg text-center">
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
