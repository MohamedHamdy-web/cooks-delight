import { useState } from "react";
import { useSignIn, SignInButton } from "@clerk/react";
import loginImg from "../../assets/images/login.jpg";
import logo from "../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: form.identifier,
        password: form.password,
      });

      navigate("/");
    } catch (err) {
      alert(err.errors?.[0]?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-semibold text-xl tracking-tight">
            Cooks <br /> Delight
          </span>
        </div>

        <div className="flex rounded-3xl overflow-hidden border border-gray-300">
          <div className="w-[55%] hidden md:block">
            <img
              src={loginImg}
              alt="cooking"
              className="w-full h-full object-cover object-[5%_center]"
            />
          </div>

          <div className="w-full md:w-[55%] bg-[#f5efe8] px-16 py-16 flex flex-col justify-center">
            <h1 className="text-8xl text-center font-extrabold mb-4">LOG IN</h1>

            <p className="text-gray-600 mb-10 text-xl text-center leading-relaxed max-w-lg">
              Welcome back to your kitchen. Log in to access your saved recipes,
              favorite dishes, and personal cooking space.
            </p>

            <form
              className="flex flex-col gap-6 max-w-lg"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-sm font-bold tracking-wide">
                  EMAIL OR USERNAME
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={(e) =>
                    setForm({ ...form, identifier: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-bold tracking-wide">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="w-full border border-black rounded-3xl p-4 mt-2 text-lg outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <button className="bg-orange-400 text-black py-4 rounded-3xl mt-4 text-lg font-semibold hover:bg-orange-500 transition">
                SIGN IN NOW!
              </button>
            </form>

            <div className="max-w-lg mt-4">
              <SignInButton mode="modal">
                <button className="w-full border border-black py-4 rounded-3xl text-lg font-semibold hover:bg-gray-100 transition">
                  CONTINUE WITH EMAIL
                </button>
              </SignInButton>
            </div>

            <div className="my-8 border-t border-gray-800 w-full max-w-lg"></div>

            <p className="text-base max-w-lg text-center">
              DON’T HAVE AN ACCOUNT?{" "}
              <span className="text-orange-400 font-medium cursor-pointer underline">
                CREATE ONE NOW
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
