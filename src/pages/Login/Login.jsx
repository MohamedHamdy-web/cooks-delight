import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/react";
import { useSignIn } from "@clerk/react/legacy";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import loginImg from "../../assets/images/login.jpg";
import logo from "../../assets/images/Logo.png";

export default function Login() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      setErrorMsg("Authentication is still loading. Please try again.");
      return;
    }

    setErrorMsg("");

    try {
      const result = await signIn.create({
        identifier: form.identifier,
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back 👋");
        navigate("/", { replace: true });
        return;
      }
      setErrorMsg("Login needs another verification step.");
    } catch (err) {
      const message = err.errors?.[0]?.message || "Login failed";
      setErrorMsg(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-3 mb-6 px-2 w-max">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-semibold text-xl tracking-tight">
            Cooks <br /> Delight
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-300">
          <div className="hidden md:block lg:w-[55%] h-75 lg:h-auto relative">
            <img
              src={loginImg}
              alt="cooking"
              className="w-full h-full object-cover object-[0%_center]"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="w-full lg:w-[45%] bg-[#f5efe8] px-10 md:px-16 py-12 md:py-16 flex flex-col justify-center">
            <h1 className="text-5xl md:text-7xl text-center font-extrabold mb-4">
              LOG IN
            </h1>

            <p className="text-gray-600 mb-8 md:mb-10 text-base md:text-lg text-center leading-relaxed max-w-lg mx-auto">
              Welcome back to your kitchen. Log in to access your saved recipes,
              favorite dishes, and personal cooking space.
            </p>

            <form
              className="flex flex-col gap-5 max-w-lg mx-auto w-full"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-sm font-bold tracking-wide">EMAIL</label>
                <input
                  type="text"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                />
              </div>

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
                  className="absolute right-4 top-13.75 text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              <button
                disabled={!isLoaded}
                className="bg-orange-400 text-black py-4 rounded-3xl mt-4 text-lg font-semibold hover:bg-orange-500 transition"
              >
                {isLoaded ? "SIGN IN NOW!" : "LOADING..."}
              </button>

              {errorMsg && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}
            </form>

            <div className="max-w-lg mx-auto w-full mt-4">
              <SignInButton
                mode="modal"
                forceRedirectUrl="/"
                fallbackRedirectUrl="/"
                signUpForceRedirectUrl="/"
                signUpFallbackRedirectUrl="/"
              >
                <button className="w-full border border-black py-4 rounded-3xl text-lg font-semibold hover:bg-gray-100 transition">
                  CONTINUE WITH EMAIL
                </button>
              </SignInButton>
            </div>

            <div className="my-6 md:my-8 border-t border-gray-800 w-full max-w-lg mx-auto"></div>

            <p className="text-base text-center max-w-lg mx-auto">
              DON’T HAVE AN ACCOUNT?{" "}
              <span
                className="text-orange-400 font-medium cursor-pointer underline"
                onClick={() => navigate("/signup")}
              >
                CREATE ONE NOW
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
